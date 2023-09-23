import { QueryObserverOptions, UseQueryResult, useQuery } from 'react-query'

import { useUser } from '@gravis-os/auth'
import { CrudItem, CrudModule } from '@gravis-os/types'
import {
  getObjectWithGetters,
  getQueryWithRouteParamsOnly,
} from '@gravis-os/utils'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import isNil from 'lodash/isNil'
import { useRouter } from 'next/router'

export interface UseGetItemProps {
  module: CrudModule
  options?: QueryObserverOptions
  slug?: null | string
}

export interface UseGetItemResult extends Omit<UseQueryResult, 'error'> {
  error: unknown
  item: any
  loading: boolean
}

const useGetItem = (props: UseGetItemProps): UseGetItemResult => {
  const { slug: injectedSlug, module, options: queryOptions } = props
  const { select, sk, table, virtuals } = module

  // User
  const { user } = useUser()

  // Router
  const router = useRouter()
  const queryWithRouteParamsOnly = getQueryWithRouteParamsOnly(router)
  const querySlug = queryWithRouteParamsOnly[sk] as string
  const routerSlug = querySlug === 'new' ? null : querySlug

  // Slug value to match
  const slug = injectedSlug ?? routerSlug

  // Method
  const fetchItem = async ({ slug }) => {
    if (!slug) return

    const onItemQuery = await supabaseClient
      .from(table.name)
      .select(select?.detail || '*')
      .match({ [sk]: slug })
      .limit(1)
      .single()

    const { data, error } = onItemQuery

    if (error) return new Error(error.message)

    return data
  }

  // Differentiate queryKey between single query and nested query with array length
  // to prevent filtering and have separate queries
  const isDetailPage = !isNil(injectedSlug)
  const queryKey = isDetailPage
    ? [table.name, 'detail', { slug }]
    : [table.name, 'detail', { slug, routerSlug }]

  // Fetch
  const onUseQuery = useQuery(queryKey, () => fetchItem({ slug }), {
    enabled: Boolean(user && !isNil(slug)),
    ...queryOptions,
  })
  const { data: item, isError: error, isLoading: loading } = onUseQuery

  // Add virtuals
  const itemWithVirtuals = getObjectWithGetters(item as CrudItem, virtuals)

  return {
    ...onUseQuery,
    error,
    item: itemWithVirtuals,
    loading,
  }
}

export default useGetItem
