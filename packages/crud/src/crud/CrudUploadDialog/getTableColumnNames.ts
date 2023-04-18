import { has, isNil, map } from 'lodash'

const getTableColumnNames = (
  tableDefinition,
  tableHeaderRenameMapping?: Record<string, string>,
  uploadFields?: string[]
): string[] | never[] => {
  if (!tableDefinition) return []

  // Remove unwanted columns
  const processedColumns = Object.entries(tableDefinition.properties).reduce(
    (acc, [key, value]) => {
      const isPrimaryKey = key === 'id'
      const isForeignKey = key.endsWith('id')
      const isCreatedOrUpdatedKey =
        key.startsWith('created_') || key.startsWith('updated_')
      const isRequiredKey = uploadFields ? uploadFields.includes(key) : false

      const shouldSkipKey =
        isPrimaryKey || isCreatedOrUpdatedKey || !isRequiredKey

      return shouldSkipKey ? acc : acc.concat(key)
    },
    []
  )

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
