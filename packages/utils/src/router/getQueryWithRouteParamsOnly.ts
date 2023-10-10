import type { ReadonlyURLSearchParams } from 'next/navigation'

// Exclude queryParams from router.query and only return routeParams.
const getQueryWithRouteParamsOnly = (
  pathname: string,
  searchParams: ReadonlyURLSearchParams
): URLSearchParams => {

  const routeParams = new Set(
    pathname
      .split('/')
      .filter((item: string) => item.startsWith('[') && item.endsWith(']'))
      .map((item: string) => item.replace('[', '').replace(']', ''))
  )

  const queryWithRouteParamsOnly = Array.from(searchParams.entries()).reduce(
    (acc, [key, value]) => {
      const isRouteParam = routeParams.has(key)
      if (!isRouteParam) return acc
      return { ...acc, [key]: value }
    },
    {}
  )
  const searchParamsWithRouteParamsOnly = new URLSearchParams(queryWithRouteParamsOnly)

  return searchParamsWithRouteParamsOnly
}

export default getQueryWithRouteParamsOnly
