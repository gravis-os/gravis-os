/* eslint-disable fp/no-let, fp/no-loops, fp/no-mutation, no-continue, unicorn/consistent-function-scoping */

import { FormSectionFieldProps } from '@gravis-os/form'

interface GetQueryFromFiltersProps {
  filterFields: FormSectionFieldProps[]
  filters: Record<string, unknown>
  query: any
}

const getQueryFromFilters = ({
  filterFields,
  filters,
  query: injectedQuery,
}: GetQueryFromFiltersProps) => {
  const hasFilters = Object.keys(filters).length > 0

  if (!hasFilters) return injectedQuery

  let query = injectedQuery

  // Apply filters to query imperatively as necessitated by Postgrest query builder
  for (const filter of Object.entries(filters)) {
    const [key, value] = filter

    // Omit object values
    if (typeof value === 'object' && !Array.isArray(value)) continue

    const currentFilterField =
      filterFields.find((filterField) => filterField.name === key) ||
      ({} as FormSectionFieldProps)
    const op = currentFilterField.op || 'eq'
    const filterKey = currentFilterField.filterKey || key

    const getValueByOp = (value, op) => {
      switch (op) {
        case 'ilike': {
          return `%${value}%`
        }
        default: {
          return value
        }
      }
    }

    // @example query.eq('name', 'johnny english')
    query = query[op](filterKey, getValueByOp(value, op))
  }

  return query
}

export default getQueryFromFilters
