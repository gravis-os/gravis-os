import { GetStaticPathsResult } from 'next/types'

/**
 * Get static paths with locales.
 *
 * @link Abstracted from https://github.com/i18next/next-i18next/blob/master/examples/ssg/lib/getStatic.js
 *
 * @example
 * return getStaticPathsWithLocales({
 *   paths: MOCK_POST_CATEGORYS[MOCK_KEY].map(({ slug }) => ({
 *     params: { categorySlug: slug },
 *   })),
 *   fallback: false,
 * })(context)
 *
 * @param staticPaths
 * @param locales
 */
const getStaticPathsWithLocales =
  (staticPaths: GetStaticPathsResult) => (context) => {
    const { locales } = context
    return {
      ...staticPaths,
      paths: staticPaths.paths
        ?.map((path) => {
          if (!locales) return path
          return locales?.map((locale) => {
            if (typeof path === 'string') return `/${locale}${path}`
            return {
              ...path,
              locale,
            }
          })
        })
        ?.flat(),
    }
  }

export default getStaticPathsWithLocales
