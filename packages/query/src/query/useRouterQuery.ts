import omit from 'lodash/omit'
import pick from 'lodash/pick'
import { NextRouter, useRouter } from 'next/navigation'
import qs, { ParsedQs } from 'qs'

export interface UseRouterQueryReturn {
  addQueryString: (newQsItem: NextRouter['query']) => Promise<boolean>
  parsedQs: ParsedQs
  queryParams: NextRouter['query']
  removeQueryString: (qsItemKey: string) => Promise<boolean>
  replaceQueryString: UseRouterQueryReturn['addQueryString']
  resetQueryString: () => void
  toggleQueryString: (newQsItem: NextRouter['query']) => Promise<boolean>
}

// pathname = "/_workspaces/[workspace]/directories/[directorySlug]"
// We want to get ['workspace', 'directorySlug']
const getQueryParamKeysFromPathname = (pathname: string) => {
  return pathname
    .split('/')
    .filter((param) => param.startsWith('[') && param.endsWith(']'))
    .map((param) => param.replace('[', '').replace(']', ''))
}

const useRouterQuery = (): UseRouterQueryReturn => {
  const router = useRouter()
  const { asPath, pathname, query } = router

  const getQueryParams = () => {
    const queryParamKeys = getQueryParamKeysFromPathname(pathname)

    return pick(query, queryParamKeys)
  }
  const queryParams = getQueryParams()

  const qsItems: ParsedQs = qs.parse(asPath.split('?')[1])

  const getAsPathWithQueryString = (queryString) =>
    `${asPath.split('?')[0]}?${queryString}`

  const addQueryString = (newQsItem: NextRouter['query']) => {
    const nextQueryString = qs.stringify({ ...qsItems, ...newQsItem })
    return router.push(
      { pathname, query: { ...query, ...newQsItem } },
      getAsPathWithQueryString(nextQueryString)
    )
  }

  const resetQueryString = () => {
    const nextQueryString = qs.stringify({})
    return router.push({ pathname }, getAsPathWithQueryString(nextQueryString))
  }

  const removeQueryString = (qsItemKey: string) => {
    const nextQueryString = qs.stringify(omit(qsItems, qsItemKey))
    return router.push(
      { pathname, query: omit(query, qsItemKey) },
      getAsPathWithQueryString(nextQueryString)
    )
  }

  const toggleQueryString = (newQsItem: NextRouter['query']) => {
    const getToggledQueryStrings = (
      qsItems,
      newQsItem: Record<string, any>
    ): NextRouter['query'] => {
      const [key, value] = Object.entries(newQsItem)[0]
      const newQueryValue = String(value)

      const currentQueryValue: string | string[] = qsItems[key]
      const hasCurrentQueryValue: boolean = key in qsItems
      const currentQueryValueInArrayType: string[] = Array.isArray(
        currentQueryValue
      )
        ? currentQueryValue
        : [currentQueryValue]
      const isNewQueryValueInCurrentQueryValue =
        currentQueryValueInArrayType.includes(newQueryValue)

      const getNextQueryValue = (): string | string[] => {
        // If no existing, add first qsItems value
        if (!hasCurrentQueryValue) return newQueryValue

        return isNewQueryValueInCurrentQueryValue
          ? // Subtract if currently exists
            currentQueryValueInArrayType.filter(
              (currentQueryValue: string) => currentQueryValue !== newQueryValue
            )
          : // Append if new value is not already selected
            [...currentQueryValueInArrayType, newQueryValue]
      }

      const nextQueryValue = getNextQueryValue()

      const nextQuery = { ...qsItems, [key]: nextQueryValue }

      return nextQuery
    }

    const nextQsItems = getToggledQueryStrings(qsItems, newQsItem)
    const nextQueryString = qs.stringify(nextQsItems)

    return router.push(
      { pathname, query: { ...query, ...newQsItem } },
      getAsPathWithQueryString(nextQueryString)
    )
  }

  // Add an alias
  const replaceQueryString = addQueryString

  return {
    addQueryString,
    parsedQs: qsItems,
    queryParams,
    removeQueryString,
    replaceQueryString,
    resetQueryString,
    toggleQueryString,
  }
}

export default useRouterQuery
