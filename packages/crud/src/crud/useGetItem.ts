import { useRouter } from 'next/router'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { CrudItem, CrudModule } from '@gravis-os/types'
import { useUser } from '@gravis-os/auth'

export interface UseGetItemArgs {
  module: CrudModule
  slug?: string | null
}

export interface UseGetItemResult extends Omit<UseQueryResult, 'error'> {
  item: CrudItem
  loading: boolean
  error: unknown
}

const useGetItem = (props: UseGetItemArgs): UseGetItemResult => {
  const { module, slug: injectedSlug } = props
  const { table, select } = module

  // User
  const { user } = useUser()

  // Router
  const router = useRouter()
  const { query } = router
  const querySlug = query[module.sk] as string
  const routerSlug = querySlug !== 'new' ? querySlug : null

  // Slug value to match
  const slug = injectedSlug || routerSlug

  // Method
  const getItem = async ({ slug }) => {
    const onItemQuery = await supabaseClient
      .from(table.name)
      .select(select?.detail || '*')
      .match({ [module.sk]: slug })
      .limit(1)

    const { data, error } = onItemQuery

    if (error) throw new Error(error.message)

    return data?.[0]
  }

  // Differentiate queryKey between single query and nested query with array length
  // to prevent filtering and have separate queries
  const isDetailPage = Boolean(!injectedSlug)
  const queryKey = isDetailPage
    ? [table.name, 'detail', { slug }]
    : [table.name, 'detail', { routerSlug, slug }]

  // Fetch
  const onUseQuery = useQuery(queryKey, () => getItem({ slug }), {
    enabled: Boolean(user && slug),
  })
  const {
    data: item,
    isLoading: loading,
    isFetching: fetching,
    isError: error,
  } = onUseQuery

  return {
    ...onUseQuery,
    item,
    loading: fetching, // @see: https://tanstack.com/query/v4/docs/guides/migrating-to-react-query-4#the-idle-state-has-been-removed
    error,
  }
}

export default useGetItem
