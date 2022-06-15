import omit from 'lodash/omit'
import omitBy from 'lodash/omitBy'
import partition from 'lodash/partition'

const saveOneToManyValues = async (props) => {
  const { item, values: oneToManyPairs, client, module } = props

  // `product`
  const primaryTableName = module.table.name

  const upsertPromises = Object.entries(oneToManyPairs).map(([key, rows]) => {
    if (!Array.isArray(rows)) return null

    const [insertRowsWithIds, updateRows] = partition(
      rows.map((row) => ({
        // Filter away relations data
        ...omitBy(row, (value) => typeof value === 'object' && value !== null),
        [`${primaryTableName}_id`]: item.id, // product_id = 1
      })),
      ({ id }) => typeof id === 'string'
    )
    const insertRows = insertRowsWithIds.map((row) => omit(row, 'id'))

    if (!module.relations?.[key]?.table?.name) return null
    const foreignTableName = module.relations[key].table.name

    const promises = [
      updateRows.length > 0 && client.from(foreignTableName).upsert(updateRows),
      insertRows.length > 0 && client.from(foreignTableName).insert(insertRows),
    ].filter(Boolean)

    // Batch upsert into a single table
    return Promise.all(promises)
  })

  return Promise.all(upsertPromises)
}

export default saveOneToManyValues
