import { FormSectionFieldProps } from '@gravis-os/form'

interface GetQueryFromFiltersProps {
  query: any
  filters: Record<string, unknown>
  filterFields: FormSectionFieldProps[]
}

const getQueryFromFilters = ({
  query: injectedQuery,
  filters,
  filterFields,
}: GetQueryFromFiltersProps) => {
  const hasFilters = Object.keys(filters).length > 0

  if (!hasFilters) return injectedQuery

  let query = injectedQuery

  // Apply filters to query imperatively as necessitated by Postgrest query builder
  Object.entries(filters).forEach((filter) => {
    const [key, value] = filter

    // Omit object values
    if (typeof value === 'object' && !Array.isArray(value)) return

    const currentFilterField =
      filterFields.find((filterField) => filterField.name === key) ||
      ({} as FormSectionFieldProps)
    const op = currentFilterField.op || 'eq'
    const filterKey = currentFilterField.filterKey || key

    const getValueByOp = (value, op) => {
      switch (op) {
        case 'ilike':
          return `%${value}%`
        default:
          return value
      }
    }

    // @example query.eq('name', 'johnny english')
    query = query[op](filterKey, getValueByOp(value, op))
  })

  return query
}

export default getQueryFromFilters
