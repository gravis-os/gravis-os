import flatten from 'lodash/flatten'

const getManyToManyUploadedRows = (
  mainTableName: string,
  manyToManyKeys: string[],
  uploadedRows: Record<string, unknown>[],
  createdRows: Record<string, unknown>[]
) => {
  const manyToManyTables = manyToManyKeys.map((key) => {
    const relationTableName = key.replace('_ids', '')
    const foreignTableName = relationTableName.replace(
      new RegExp(`_?${mainTableName}_?`),
      ''
    )

    return {
      tableName: relationTableName,
      rows:
        flatten(
          uploadedRows?.map((row, index) => {
            const { id: mainTableId } = createdRows[index]
            const foreignTableIds = row[key] && String(row[key]).split(',')

            const nextRows =
              foreignTableIds?.map((foreignTableId) => ({
                [`${mainTableName}_id`]: mainTableId,
                [`${foreignTableName}_id`]: Number(foreignTableId),
              })) || []

            return nextRows
          })
        ) || [],
    }
  })

  return manyToManyTables
}

export default getManyToManyUploadedRows
