import type { QueryClient } from 'react-query'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import type { CrudItem, CrudModule } from '@gravis-os/types'
import { getObjectWithGetters } from '@gravis-os/utils'
import camelCase from 'lodash/camelCase'
import capitalize from 'lodash/capitalize'
import omit from 'lodash/omit'
import snakeCase from 'lodash/snakeCase'
import flowRight from 'lodash/flowRight'
import useRouterQuery from './useRouterQuery'
import {
  UseDetailProps,
  FetchDetailFilters,
  UseDetailOptions,
  SupabasePostgrestBuilderMatchType,
  UseDetailReturn,
} from './types'

// Matcher
export const getFetchDetailFilters = (
  props: UseDetailProps
): FetchDetailFilters => {
  const { module, params, options = {} } = props

  if (!params) return {}

  // Rename 'postSlug' to 'slug' for client.from('posts').match({ slug: slugValue })
  const withRenameSlugToSk =
    ({ module }: { module: CrudModule }) =>
    (match: SupabasePostgrestBuilderMatchType) => {
      const slugKey = `${camelCase(module.table.name)}${capitalize(module.sk)}`
      const slugValue = match[slugKey]

      return {
        ...omit(match, [slugKey]),
        [module.sk]: slugValue,
      }
    }

  // Rename 'workspace' to 'workspace.slug' for client.from('posts').match({ 'workspace.slug': workspaceValue })
  const withRenameWorkspaceToWorkspaceSlug =
    () => (match: SupabasePostgrestBuilderMatchType) => {
      return {
        ...omit(match, ['workspace']),
        'workspace.slug': match.workspace,
      }
    }

  // Expose options to rename router query params to .match() keys
  const withMapParamsToMatchKeys =
    (options: UseDetailOptions) =>
    (match: SupabasePostgrestBuilderMatchType) => {
      const hasMapParamsToMatchKeysOption = Boolean(
        options.mapParamsToMatchKeys
      )

      if (!hasMapParamsToMatchKeysOption) return match

      return Object.entries(match).reduce((acc, [key, value]) => {
        const nextKey = options.mapParamsToMatchKeys?.[key] || key
        return { ...acc, [nextKey]: value }
      }, {})
    }

  const withReplaceCamelCaseWithDotCase =
    () => (match: SupabasePostgrestBuilderMatchType) => {
      return (
        match &&
        Object.entries(match).reduce((acc, [key, value]) => {
          const nextKey = key.includes('.')
            ? key
            : snakeCase(key).replace('_', '.')
          return { ...acc, [nextKey]: value }
        }, {})
      )
    }

  const match = flowRight(
    withReplaceCamelCaseWithDotCase(),
    withMapParamsToMatchKeys(options),
    withRenameWorkspaceToWorkspaceSlug(),
    withRenameSlugToSk({ module })
  )(params)

  return {
    match,
  }
}

// QueryKey
export const getFetchDetailQueryKey = (props: UseDetailProps) => {
  const { module } = props
  return [module.table.name, 'detail', getFetchDetailFilters(props)]
}

// Fetcher
export const getFetchDetail = (props: UseDetailProps) => {
  const { module } = props

  return async () => {
    const detailFilters = getFetchDetailFilters(props)

    const { match } = detailFilters
    if (!match) return

    return supabaseClient
      .from(module.table.name)
      .select(module?.select?.detail)
      .match(match)
      .single()
  }
}

// Prefetch
export const prefetchDetailQuery = async (
  queryClient: QueryClient,
  props: UseDetailProps
) => {
  return queryClient.prefetchQuery(
    getFetchDetailQueryKey(props),
    getFetchDetail(props)
  )
}

// Hook
const useDetail = <T = any>(props: UseDetailProps): UseDetailReturn<T> => {
  const { module, params: injectedParams } = props

  const router = useRouter()
  const { query, defaultLocale, locale, locales } = router

  const { queryParams } = useRouterQuery()

  /**
   * Declutter the router.query. Picking on the queryParams and excluding the queryString
   * The queryParams are required for the detail query to function.
   * Remove queryParams from detail query because detail fetch should not
   * be affected by queryString (?a=foo&b=bar). It should only listen to the queryParams /pages/[slug].tsx)
   * queryString only appears in the browser when router is ready. Not applicable in the server (getStaticProps)
   */
  const params = injectedParams || queryParams

  // Pass through router props to simulate getStaticPropsContext on the client
  const nextProps = { ...props, params, defaultLocale, locale, locales }

  const detailQueryKey = getFetchDetailQueryKey(nextProps)
  const detailFilters = getFetchDetailFilters(nextProps)
  const fetchDetail = getFetchDetail(nextProps)

  // Only query when there is an skValue
  const skValue = detailFilters.match?.[module.sk]

  const onUseQuery = useQuery(detailQueryKey, fetchDetail, {
    enabled: Boolean(skValue),
  })
  const { data } = onUseQuery
  const item = (data as any)?.data || {}

  // Add virtuals
  const itemWithVirtuals = getObjectWithGetters(item, module.virtuals) as any

  return {
    ...onUseQuery,
    // Aliases
    item: itemWithVirtuals,
  }
}

export default useDetail
