import {
  UseInfiniteQueryResult,
  UseQueryOptions,
  UseQueryResult,
} from 'react-query'

import { CrudItem, CrudModule } from '@gravis-os/types'
import { GetStaticPropsContext } from 'next/types'

import { UsePaginationReturn } from './usePagination'
import { UseRouterQueryReturn } from './useRouterQuery'

export type SupabasePostgrestFilterOperator =
  | 'adj'
  | 'cd'
  | 'cs'
  | 'eq'
  | 'fts'
  | 'gt'
  | 'gte'
  | 'ilike'
  | 'in'
  | 'is'
  | 'like'
  | 'lt'
  | 'lte'
  | 'neq'
  | 'not.adj'
  | 'not.cd'
  | 'not.cs'
  | 'not.eq'
  | 'not.fts'
  | 'not.gt'
  | 'not.gte'
  | 'not.ilike'
  | 'not.in'
  | 'not.is'
  | 'not.like'
  | 'not.lt'
  | 'not.lte'
  | 'not.neq'
  | 'not.nxl'
  | 'not.nxr'
  | 'not.ov'
  | 'not.phfts'
  | 'not.plfts'
  | 'not.sl'
  | 'not.sr'
  | 'not.wfts'
  | 'nxl'
  | 'nxr'
  | 'ov'
  | 'phfts'
  | 'plfts'
  | 'sl'
  | 'sr'
  | 'wfts'

export type SupabasePostgrestBuilderMatchType = Record<
  string,
  boolean | number | string | string[] | undefined
>

export type SupabasePostgrestBuilderFiltersType =
  | []
  | Array<{
      key: string
      op: SupabasePostgrestFilterOperator
      value: boolean | number | string
    }>

export type SupabasePostgrestBuilderOrsType = [] | string[]

// ==============================
// List
// ==============================
export enum UseListPaginationType {
  Infinite = 'infinite-scroll',
  Pagination = 'pagination',
}

// The values here can't be undefined because they are used as
// react-query keys which does not currently support undefined, so use null instead.
export interface UseListFilters {
  contains: [string, Array<number | string>] | null
  filters: SupabasePostgrestBuilderFiltersType
  gt: Array<number | string> | null
  gte: Array<number | string> | null
  ilike: Array<number | string> | null
  limit: null | number
  lt: Array<number | string> | null
  lte: Array<number | string> | null
  match: SupabasePostgrestBuilderMatchType
  not: Array<unknown> | null
  order:
    | [
        string,
        { ascending?: boolean; foreignTable?: string; nullsFirst?: boolean }
      ]
    | null
  ors: SupabasePostgrestBuilderOrsType
  range: [number, number] | null
  select?: string
}

export interface UseListProps
  extends GetStaticPropsContext,
    Partial<UseListFilters> {
  /**
   * Default sort order
   * @default 'created_at.desc'
   */
  defaultSortOrder?: string
  /**
   * Allow user to disable pagination
   * @default false
   */
  disablePagination?: boolean
  /**
   * Allow user to disable workspace_id plugin
   * @default false
   */
  disableWorkspacePlugin?: boolean
  /**
   * Filter by query string, connected to next router
   * @default false
   */
  filterByQueryString?: boolean
  module: CrudModule
  pagination?: {
    /**
     * To get supabase query to return the count only
     * mainly for use with infinitePaginate
     * @default false
     */
    countOnly?: boolean
    /**
     * For use with paginate: true
     * Derived from router query string
     * @default 1
     */
    page?: number
    /**
     * Provided by react-query's useInfiniteQuery for infinite scroll
     */
    pageParam?: number
    /**
     * The pageSize/limit to use when paginating.
     * @default 12
     */
    pageSize?: number
    /**
     * Triggers pageNumber in router query
     * @default false
     */
    paginate?: boolean
    /**
     * Triggers useInfiniteQuery
     * @default UseListPaginationType.Infinite
     */
    paginationType?: UseListPaginationType
  }
  parsedQs?: UseRouterQueryReturn['parsedQs']
  /**
   * Allow user to extend filters externally
   */
  plugins?: any[]
  queryOptions?: UseQueryOptions
  /**
   * Escape hatch for the final query
   */
  setQuery?: (query) => Promise<any>
}

export type UseListReturn = (UseInfiniteQueryResult | UseQueryResult) & {
  count?: number
  fetchNextPage?: UseInfiniteQueryResult['fetchNextPage']
  items: [] | CrudItem[]
  pagination: UsePaginationReturn
}

// ==============================
// Detail
// ==============================
export interface UseDetailOptions {
  /**
   * An object to rename router query params to
   * postgrest builder match type for attaching
   * to the request payload.
   */
  mapParamsToMatchKeys?: Record<string, string>
}
export interface UseDetailProps extends GetStaticPropsContext {
  module: CrudModule
  options?: UseDetailOptions
}
export interface FetchDetailFilters {
  match?: SupabasePostgrestBuilderMatchType
}

export type UseDetailReturn<T = any> = UseQueryResult & {
  item: CrudItem & T
}
