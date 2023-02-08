const getTableColumnNames = (tableDefinition): string[] | never[] => {
  if (!tableDefinition) return []

  // Remove unwanted columns
  return Object.entries(tableDefinition.properties).reduce(
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
}

export default getTableColumnNames
