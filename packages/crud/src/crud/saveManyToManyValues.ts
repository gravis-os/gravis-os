// Save joins
import { getRelationalObjectKey } from '@gravis-os/form'
import pick from 'lodash/pick'

const saveManyToManyValues = async (args) => {
  const { client, data, fieldDefs, item, module, values } = args

  const getHelpers = ({ key, value }) => {
    const relationalObjectKey = getRelationalObjectKey(key)
    const isInjectedRelation = Boolean(
      module?.relations?.[`${relationalObjectKey}s`]
    )
    const joinKey = `${relationalObjectKey}_ids`

    // If relation is declared in the module, use it, else fallback to
    // Postgrest default shape to construct the join table name
    // We're expecting { relations: { tags: { joinTable: { name: '' } } } }
    const joinTableName = isInjectedRelation
      ? module.relations[`${relationalObjectKey}s`]?.joinTable?.name
      : `${module.table.name}_${relationalObjectKey}`

    const helpers = {
      currentColumnName: `${module.table.name}_id`,
      currentValueIds: value.map((v) => v.id),
      joinKey,
      joinTableName,
      opposingColumnName: `${relationalObjectKey}_id`,
      prevValueIds: item?.[joinKey]?.map((v) => v.id) || [],
      relationalObjectKey,
    }

    return helpers
  }

  const deletePromises = Object.entries(values).map(([key, value]) => {
    if (!Array.isArray(value)) return

    const { currentValueIds, joinTableName, opposingColumnName, prevValueIds } =
      getHelpers({ key, value })

    // Find difference in prevValue and currentValue arrays
    const opposingTableIdsToDelete = prevValueIds.filter(
      (prevValueId) => !currentValueIds.includes(prevValueId)
    )

    if (opposingTableIdsToDelete.length === 0) return

    return client
      .from(joinTableName)
      .delete()
      .in(opposingColumnName, opposingTableIdsToDelete)
  })

  const upsertPromises = Object.entries(values).map(([key, value]) => {
    if (!Array.isArray(value)) return

    const {
      currentColumnName,
      currentValueIds,
      joinTableName,
      opposingColumnName,
      prevValueIds,
    } = getHelpers({
      key,
      value,
    })

    const joinTableRecords = value
      .map((val) => {
        // Find difference in prevValue and currentValue arrays
        if (prevValueIds.includes(val.id)) return

        // Pick out declared extra columns of many-to-many table for saving
        const manyToManyExtraColumns = fieldDefs?.[key]
          ?.manyToManyExtraColumnKeys?.length
          ? pick(val, fieldDefs[key].manyToManyExtraColumnKeys)
          : null

        return {
          [currentColumnName]: data.id,
          [opposingColumnName]: val.id,
          ...manyToManyExtraColumns,
        }
      })
      .filter(Boolean)

    if (joinTableRecords.length === 0) return

    return client.from(joinTableName).upsert(joinTableRecords)
  })

  return Promise.all([...upsertPromises, ...deletePromises])
}

export default saveManyToManyValues
