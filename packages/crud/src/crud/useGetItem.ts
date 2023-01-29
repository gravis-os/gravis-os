import { NextRouter, useRouter } from 'next/router'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { QueryObserverOptions, useQuery, UseQueryResult } from 'react-query'
import { CrudItem, CrudModule } from '@gravis-os/types'
import { useUser } from '@gravis-os/auth'
import {
  getObjectWithGetters,
  getQueryWithRouteParamsOnly,
} from '@gravis-os/utils'

export interface UseGetItemProps {
  module: CrudModule
  slug?: string | null
  options?: QueryObserverOptions
}

export interface UseGetItemResult extends Omit<UseQueryResult, 'error'> {
  item: any
  loading: boolean
  error: unknown
}

const useGetItem = (props: UseGetItemProps): UseGetItemResult => {
  const { module, slug: injectedSlug, options: queryOptions } = props
  const { table, select } = module

  // User
  const { user } = useUser()

  // Router
  const router = useRouter()
  const queryWithRouteParamsOnly = getQueryWithRouteParamsOnly(router)
  const querySlug = queryWithRouteParamsOnly[module.sk] as string
  const routerSlug = querySlug !== 'new' ? querySlug : null

  // Slug value to match
  const slug = injectedSlug || routerSlug

  // Method
  const fetchItem = async ({ slug }) => {
    const onItemQuery = await supabaseClient
      .from(table.name)
      .select(select?.detail || '*')
      .match({ [module.sk]: slug })
      .single()

    const { data, error } = onItemQuery

    if (error) throw new Error(error.message)

    return data
  }

  // Differentiate queryKey between single query and nested query with array length
  // to prevent filtering and have separate queries
  const isDetailPage = Boolean(!injectedSlug)
  const queryKey = isDetailPage
    ? [table.name, 'detail', { slug }]
    : [table.name, 'detail', { routerSlug, slug }]

  // Fetch
  const onUseQuery = useQuery(queryKey, () => fetchItem({ slug }), {
    enabled: Boolean(user && slug),
    ...queryOptions,
  })
  const { data: item, isLoading: loading, isError: error } = onUseQuery

  // Add virtuals
  const itemWithVirtuals = getObjectWithGetters(
    item as CrudItem,
    module.virtuals
  )

  return {
    ...onUseQuery,
    item: itemWithVirtuals,
    loading,
    error,
  }
}

export default useGetItem
