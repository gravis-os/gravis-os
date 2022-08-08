import { useRouter } from 'next/router'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { useUser } from '@supabase/supabase-auth-helpers/react/components/UserProvider'
import { useQuery, UseQueryResult } from 'react-query'
import { CrudItem, CrudModule } from '@gravis-os/types'

export interface UseGetItemArgs {
  module: CrudModule
  slug?: string | null
}

export type UseGetItemResult = {
  item: CrudItem
  loading: boolean
  error: unknown
} & Omit<UseQueryResult, 'error'>

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
    ? [table.name, slug]
    : [table.name, routerSlug, slug]

  // Fetch
  const onUseQuery = useQuery(queryKey, () => getItem({ slug }), {
    enabled: Boolean(user && slug),
  })
  const { data: item, isLoading: loading, isError: error } = onUseQuery

  return {
    ...onUseQuery,
    item,
    loading,
    error,
  }
}

export default useGetItem
