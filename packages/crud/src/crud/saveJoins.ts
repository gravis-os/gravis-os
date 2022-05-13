// Save joins
import getRelationalObjectKey from '../form/getRelationalObjectKey'

const saveJoins = async (args) => {
  const { item, values, client, module } = args

  const getHelpers = ({ key, value }) => {
    const relationalObjectKey = getRelationalObjectKey(key)
    const joinKey = `${relationalObjectKey}_ids`

    const helpers = {
      relationalObjectKey,
      joinTableName: `${module.table.name}_${relationalObjectKey}`,
      currentColumnName: `${module.table.name}_id`,
      opposingColumnName: `${relationalObjectKey}_id`,
      joinKey,
      prevValueIds: item[joinKey].map((v) => v.id),
      currentValueIds: value.map((v) => v.id),
    }

    return helpers
  }

  const deletePromises = Object.entries(values).map(([key, value]) => {
    if (!Array.isArray(value)) return

    const { joinTableName, opposingColumnName, prevValueIds, currentValueIds } = getHelpers({ key, value })

    // Find difference in prevValue and currentValue arrays
    const opposingTableIdsToDelete = prevValueIds.filter((prevValueId) => !currentValueIds.includes(prevValueId))

    if (!opposingTableIdsToDelete.length) return

    return client.from(joinTableName).delete().in(opposingColumnName, opposingTableIdsToDelete)
  })

  const upsertPromises = Object.entries(values).map(([key, value]) => {
    if (!Array.isArray(value)) return

    const { joinTableName, currentColumnName, opposingColumnName, prevValueIds, currentValueIds } = getHelpers({
      key,
      value,
    })

    const joinTableRecords = value
      .map((val) => {
        // Find difference in prevValue and currentValue arrays
        if (prevValueIds.includes(val.id)) return

        return {
          [currentColumnName]: item.id,
          [opposingColumnName]: val.id,
        }
      })
      .filter(Boolean)

    if (!joinTableRecords.length) return

    return client.from(joinTableName).upsert(joinTableRecords)
  })

  return Promise.all([...upsertPromises, ...deletePromises])
}

export default saveJoins
