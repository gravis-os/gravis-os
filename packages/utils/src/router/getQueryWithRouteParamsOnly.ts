import type { NextRouter } from 'next/router'

// Exclude queryParams from router.query and only return routeParams.
const getQueryWithRouteParamsOnly = (
  router: NextRouter
): NextRouter['query'] => {
  const { pathname, query } = router

  const routeParams = new Set(
    pathname
      .split('/')
      .filter((item: string) => item.startsWith('[') && item.endsWith(']'))
      .map((item: string) => item.replace('[', '').replace(']', ''))
  )

  const queryWithRouteParamsOnly = Object.entries(query).reduce(
    (acc, [key, value]) => {
      const isRouteParam = routeParams.has(key)
      if (!isRouteParam) return acc
      return { ...acc, [key]: value }
    },
    {}
  )

  return queryWithRouteParamsOnly
}

export default getQueryWithRouteParamsOnly
