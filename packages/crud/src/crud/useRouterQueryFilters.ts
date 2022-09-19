import { useRouter } from 'next/router'
import { getRelationalObjectKey } from '@gravis-os/form'

/**
 * useRouterQueryFilters
 * Filter by query params
 *
 * We store filter state in the router query params
 * so that we can enable filters via deep-links and have other components
 * control the filter state.
 */
const useRouterQueryFilters = (args) => {
  const { filterFields } = args

  // Router
  const router = useRouter()
  const { pathname, query: routerQuery } = router

  // Get query params to set into the router with the existing filters
  const getRouterQueryFromFilters = (filters) =>
    Object.entries(filters).reduce((acc, filter) => {
      const [key, value] = filter

      // Filter out objects
      if (typeof value === 'object' && !Array.isArray(value)) return acc

      const defaultReturn = { ...acc, [key]: value }

      /**
       * Get relation title/name string based on the id e.g. id === 2
       * This attempts to retrieve the title of the relation object based on its id
       * by sourcing from the filters object if the filter was newly set, or from the router
       * query params if it was set before this render cycle.
       */
      if (key.endsWith('_id')) {
        const relationalObjectKey = getRelationalObjectKey(key)

        // Check if this field is a valid filter
        const filterField = filterFields.find(
          (filterField) => filterField.key === key
        )
        if (!filterField) return defaultReturn

        // Get the relation title from filters (if newly set), else from the router query
        const relationalObject =
          filters[relationalObjectKey] || routerQuery[relationalObjectKey]
        if (!relationalObject) return defaultReturn

        // Set relationalObjectValue to render the correct title
        const { pk = 'title' } = filterField.module
        const relationalObjectValue =
          typeof relationalObject === 'object'
            ? relationalObject[pk]
            : relationalObject
        return {
          ...defaultReturn,
          [relationalObjectKey]: relationalObjectValue,
        }
      }

      return defaultReturn
    }, {})

  const getValidFilters = (filters) => {
    const filterFieldKeys = filterFields.map((field) => field.key)
    return Object.entries(filters).reduce((acc, filter) => {
      const [key, value] = filter
      const isFilterKeyFoundInFilterFields = filterFieldKeys.includes(key)
      if (!isFilterKeyFoundInFilterFields) return acc
      return { ...acc, [key]: value }
    }, {})
  }

  const setFilters = (filters) => {
    const nextRouterQuery = getRouterQueryFromFilters(filters)

    const isWorkspacePathname = pathname.startsWith('/_workspaces/[workspace]')
    const [_, ...workspaceSubpath] = isWorkspacePathname
      ? pathname.split('/_workspaces/[workspace]')
      : []
    const nextPathname = workspaceSubpath ? workspaceSubpath[0] : pathname

    return router.push({ pathname: nextPathname, query: nextRouterQuery })
  }

  const filters = getValidFilters(routerQuery)

  return {
    getRouterQueryFromFilters,
    getValidFilters,
    filters,
    setFilters,
  }
}

export default useRouterQueryFilters
