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
      rows:
        flatten(
          uploadedRows?.map((row, index) => {
            const { id: mainTableId } = createdRows[index]
            const foreignTableIds = row[key] && String(row[key]).split(',')

            const nextRows =
              foreignTableIds?.map((foreignTableId) => ({
                [`${foreignTableName}_id`]: Number(foreignTableId),
                [`${mainTableName}_id`]: mainTableId,
              })) || []

            return nextRows
          })
        ) || [],
      tableName: relationTableName,
    }
  })

  return manyToManyTables
}

export default getManyToManyUploadedRows
