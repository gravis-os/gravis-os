import { has, isNil, map } from 'lodash'

const getTableColumnNames = (
  tableDefinition,
  tableHeaderRenameMapping?: Record<string, string>,
  uploadFields?: string[],
  manyToManyKeys?: string[]
): string[] | never[] => {
  if (!tableDefinition) return []

  // Remove unwanted columns
  const columns = Object.keys(tableDefinition.properties).concat(
    manyToManyKeys || []
  )
  const processedColumns = columns.reduce((acc, key) => {
    const isPrimaryKey = key === 'id'
    const isCreatedOrUpdatedKey =
      key.startsWith('created_') || key.startsWith('updated_')
    const isRequiredKey = uploadFields ? uploadFields.includes(key) : false

    const shouldSkipKey =
      isPrimaryKey || isCreatedOrUpdatedKey || !isRequiredKey

    return shouldSkipKey ? acc : acc.concat(key)
  }, [])

  // Map column names if tableHeaderRenameMapping is given
  return !isNil(tableHeaderRenameMapping)
    ? map(processedColumns, (column) => {
        return has(tableHeaderRenameMapping, column)
          ? tableHeaderRenameMapping[column]
          : column
      })
    : processedColumns
}

export default getTableColumnNames
