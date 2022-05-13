const getQueryFromFilters = (query, filters, filterFields) => {
  const hasFilters = Object.keys(filters).length > 0

  if (!hasFilters) return query

  // Apply filters to query imperatively as necessitated by Postgrest query builder
  Object.entries(filters).forEach((filter) => {
    const [key, value] = filter

    // Omit object values
    if (typeof value === 'object' && !Array.isArray(value)) return

    const op = filterFields.find((filterField) => filterField.name === key)?.op || 'eq'

    const getValueByOp = (value, op) => {
      switch (op) {
        case 'ilike':
          return `%${value}%`
        default:
          return value
      }
    }

    // eslint-disable-next-line no-param-reassign
    query = query[op](key, getValueByOp(value, op))
  })

  return query
}

export default getQueryFromFilters
