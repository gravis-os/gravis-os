import { has, isNil, map } from 'lodash'

const getTableColumnNames = (
  tableDefinition,
  tableDefinitionMapping?: Record<string, string>
): string[] | never[] => {
  if (!tableDefinition) return []

  // Remove unwanted columns
  const processedColumns = Object.entries(tableDefinition.properties).reduce(
    (acc, [key, value]) => {
      const isPrimaryKey = key === 'id'
      const isForeignKey = key.endsWith('id')
      const isCreatedOrUpdatedKey =
        key.startsWith('created_') || key.startsWith('updated_')

      const shouldSkipKey = isPrimaryKey || isCreatedOrUpdatedKey

      return shouldSkipKey ? acc : acc.concat(key)
    },
    []
  )

  // Map column names if tableDefinitionMapping is given
  return !isNil(tableDefinitionMapping)
    ? map(processedColumns, (column) => {
        return has(tableDefinitionMapping, column)
          ? tableDefinitionMapping[column]
          : column
      })
    : processedColumns
}

export default getTableColumnNames
