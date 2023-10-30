import concat from 'lodash/concat'
import has from 'lodash/has'
import isNil from 'lodash/isNil'
import map from 'lodash/map'

const getTableColumnNames = (
  tableDefinition,
  tableHeaderRenameMapping?: Record<string, string>,
  uploadFields?: string[],
  manyToManyKeys?: string[]
): never[] | string[] => {
  if (!tableDefinition) return []

  // Remove unwanted columns
  const columns = new Set([
    ...Object.keys(tableDefinition.properties),
    ...(manyToManyKeys || []),
  ])

  const processedColumns = (uploadFields ?? []).reduce((acc, key) => {
    const isPrimaryKey = key === 'id'
    const isCreatedOrUpdatedKey =
      key.startsWith('created_') || key.startsWith('updated_')
    const hasKey = columns.has(key)

    const shouldSkipKey = isPrimaryKey || isCreatedOrUpdatedKey || !hasKey

    return shouldSkipKey ? acc : concat(acc, key)
  }, [])

  // Map column names if tableHeaderRenameMapping is given
  return isNil(tableHeaderRenameMapping)
    ? processedColumns
    : map(processedColumns, (column) => {
        return has(tableHeaderRenameMapping, column)
          ? tableHeaderRenameMapping[column]
          : column
      })
}

export default getTableColumnNames
