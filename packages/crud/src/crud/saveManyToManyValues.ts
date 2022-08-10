// Save joins
import { getRelationalObjectKey } from '@gravis-os/form'
import pick from 'lodash/pick'

const saveManyToManyValues = async (args) => {
  const { item, values, client, module, fieldDefs } = args

  const getHelpers = ({ key, value }) => {
    const relationalObjectKey = getRelationalObjectKey(key)
    const isInjectedRelation = Boolean(module?.relations?.[relationalObjectKey])
    const joinKey = `${relationalObjectKey}_ids`

    const joinTableName = isInjectedRelation
      ? module.relations[relationalObjectKey]?.table?.name
      : `${module.table.name}_${relationalObjectKey}`

    const helpers = {
      relationalObjectKey,
      joinTableName,
      currentColumnName: `${module.table.name}_id`,
      opposingColumnName: `${relationalObjectKey}_id`,
      joinKey,
      prevValueIds: item[joinKey]?.map((v) => v.id) || [],
      currentValueIds: value.map((v) => v.id),
    }

    return helpers
  }

  const deletePromises = Object.entries(values).map(([key, value]) => {
    if (!Array.isArray(value)) return

    const { joinTableName, opposingColumnName, prevValueIds, currentValueIds } =
      getHelpers({ key, value })

    // Find difference in prevValue and currentValue arrays
    const opposingTableIdsToDelete = prevValueIds.filter(
      (prevValueId) => !currentValueIds.includes(prevValueId)
    )

    if (!opposingTableIdsToDelete.length) return

    return client
      .from(joinTableName)
      .delete()
      .in(opposingColumnName, opposingTableIdsToDelete)
  })

  const upsertPromises = Object.entries(values).map(([key, value]) => {
    if (!Array.isArray(value)) return

    const {
      joinTableName,
      currentColumnName,
      opposingColumnName,
      prevValueIds,
      currentValueIds,
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
          [currentColumnName]: item.id,
          [opposingColumnName]: val.id,
          ...manyToManyExtraColumns,
        }
      })
      .filter(Boolean)

    if (!joinTableRecords.length) return

    return client.from(joinTableName).upsert(joinTableRecords)
  })

  return Promise.all([...upsertPromises, ...deletePromises])
}

export default saveManyToManyValues
