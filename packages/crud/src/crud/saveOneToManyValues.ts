import differenceBy from 'lodash/differenceBy'
import isEmpty from 'lodash/isEmpty'
import omit from 'lodash/omit'
import omitBy from 'lodash/omitBy'
import partition from 'lodash/partition'
import pick from 'lodash/pick'

const saveOneToManyValues = async (props) => {
  const { client, data, item, module, values: oneToManyPairs } = props

  // `product`
  const primaryTableName = module.table.name

  const upsertPromises = Object.entries(oneToManyPairs).map(([key, rows]) => {
    if (!Array.isArray(rows)) return null

    const foreignTableName = module.relations?.[key]?.table?.name
    if (!foreignTableName) return null

    const foreignTableColumns = module.relations[key].table.columns
    const hasForeignTableColumns =
      Array.isArray(foreignTableColumns) && !isEmpty(foreignTableColumns)

    const [insertRowsWithIds, updateRows] = partition(
      rows.map((row) => {
        // Filter away relations data
        const nextRow = hasForeignTableColumns
          ? pick(row, foreignTableColumns)
          : omitBy(row, (value) => typeof value === 'object' && value !== null)
        return {
          ...nextRow,
          [`${primaryTableName}_id`]: data.id, // product_id = 1
        }
      }),
      ({ id }) => !id || typeof id === 'string'
    )
    const insertRows = insertRowsWithIds.map((row) => omit(row, 'id'))
    const deleteIds = differenceBy(item?.[key], rows, 'id').map(
      ({ id }: any) => id
    )

    const promises = [
      updateRows.length > 0 &&
        client.from(foreignTableName).upsert(updateRows).select(),
      insertRows.length > 0 &&
        client.from(foreignTableName).insert(insertRows).select(),
      deleteIds.length > 0 &&
        client.from(foreignTableName).delete().in('id', deleteIds).select(),
    ].filter(Boolean)

    // Batch upsert into a single table
    return Promise.all(promises)
  })

  return Promise.all(upsertPromises)
}

export default saveOneToManyValues
