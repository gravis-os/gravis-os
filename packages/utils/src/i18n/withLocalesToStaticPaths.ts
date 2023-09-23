import { GetStaticPathsResult } from 'next/types'

/**
 * withLocalesToStaticPaths
 *
 * @usage
 * return flowRight(withLocalesToStaticPaths(context))(staticPathsResult)
 *
 * @param context
 */
const withLocalesToStaticPaths =
  (context) => (staticPathsResult: GetStaticPathsResult) => {
    const { locales } = context

    if (!locales) return staticPathsResult

    return {
      ...staticPathsResult,
      paths: staticPathsResult.paths
        ?.map((path) => {
          return locales
            ?.map((locale) => {
              // If this is a string path
              if (typeof path === 'string') return `/${locale}${path}`

              // If this is an object path
              const { params } = path
              const { blocked_locales, exclusive_locales } = params || {}

              // Calculate the existence and logic of exclusive/blocked locales
              const hasExclusiveLocales = exclusive_locales?.length
              const hasBlockedLocales = blocked_locales?.length
              const hasExclusiveLocalesOrBlockedLocales =
                hasExclusiveLocales || hasBlockedLocales
              const isLocaleInExclusiveLocales =
                hasExclusiveLocales && exclusive_locales.includes(locale)
              const isLocaleNotInBlockedLocales =
                hasBlockedLocales && !blocked_locales.includes(locale)

              /**
               * Return object path based on these conditions:
               *
               * (1) there is no concept of exclusive/blocked locales or;
               * (2) if the current locale is in exclusive_locales or;
               * (3) if the current locale is not blocked_locales.
               */
              const shouldReturnPath = Boolean(
                !hasExclusiveLocalesOrBlockedLocales ||
                  isLocaleInExclusiveLocales ||
                  isLocaleNotInBlockedLocales
              )

              if (!shouldReturnPath) return false

              // Default return
              return { ...path, locale }
            })
            ?.filter(Boolean)
        })
        ?.flat(),
    }
  }

export default withLocalesToStaticPaths
