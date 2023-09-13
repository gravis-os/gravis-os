import { CrudItem, CrudModule } from '@gravis-os/types'
import { GetStaticPropsContext } from 'next/types'
import {
  UseInfiniteQueryResult,
  UseQueryOptions,
  UseQueryResult,
} from 'react-query'
import { UsePaginationReturn } from './usePagination'
import { UseRouterQueryReturn } from './useRouterQuery'

export type SupabasePostgrestFilterOperator =
  | 'eq'
  | 'neq'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'like'
  | 'ilike'
  | 'is'
  | 'in'
  | 'cs'
  | 'cd'
  | 'sl'
  | 'sr'
  | 'nxl'
  | 'nxr'
  | 'adj'
  | 'ov'
  | 'fts'
  | 'plfts'
  | 'phfts'
  | 'wfts'
  | 'not.eq'
  | 'not.neq'
  | 'not.gt'
  | 'not.gte'
  | 'not.lt'
  | 'not.lte'
  | 'not.like'
  | 'not.ilike'
  | 'not.is'
  | 'not.in'
  | 'not.cs'
  | 'not.cd'
  | 'not.sl'
  | 'not.sr'
  | 'not.nxl'
  | 'not.nxr'
  | 'not.adj'
  | 'not.ov'
  | 'not.fts'
  | 'not.plfts'
  | 'not.phfts'
  | 'not.wfts'

export type SupabasePostgrestBuilderMatchType = Record<
  string,
  string | string[] | boolean | number | undefined
>

export type SupabasePostgrestBuilderFiltersType =
  | Array<{
      key: string
      op: SupabasePostgrestFilterOperator
      value: string | number | boolean
    }>
  | []

export type SupabasePostgrestBuilderOrsType = string[] | []

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
  match: SupabasePostgrestBuilderMatchType
  filters: SupabasePostgrestBuilderFiltersType
  ors: SupabasePostgrestBuilderOrsType
  limit: number | null
  range: [number, number] | null
  order:
    | null
    | [
        string,
        { ascending?: boolean; foreignTable?: string; nullsFirst?: boolean },
      ]
  gt: Array<string | number> | null
  lt: Array<string | number> | null
  gte: Array<string | number> | null
  lte: Array<string | number> | null
  ilike: Array<string | number> | null
  not: Array<string | number> | null
  contains: [string, Array<string | number>] | null
  select?: string
}

export interface UseListProps
  extends GetStaticPropsContext,
    Partial<UseListFilters> {
  module: CrudModule
  queryOptions?: UseQueryOptions
  pagination?: {
    /**
     * For use with paginate: true
     * Derived from router query string
     * @default 1
     */
    page?: number
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
    /**
     * Provided by react-query's useInfiniteQuery for infinite scroll
     */
    pageParam?: number
    /**
     * To get supabase query to return the count only
     * mainly for use with infinitePaginate
     * @default false
     */
    countOnly?: boolean
  }
  parsedQs?: UseRouterQueryReturn['parsedQs']
  /**
   * Filter by query string, connected to next router
   * @default false
   */
  filterByQueryString?: boolean
  /**
   * Allow user to extend filters externally
   */
  plugins?: any[]
  /**
   * Allow user to disable workspace_id plugin
   * @default false
   */
  disableWorkspacePlugin?: boolean
  /**
   * Allow user to disable pagination
   * @default false
   */
  disablePagination?: boolean
  /**
   * Default sort order
   * @default 'created_at.desc'
   */
  defaultSortOrder?: string
  /**
   * Escape hatch for the final query
   */
  setQuery?: (query) => Promise<any>
}

export type UseListReturn = (UseInfiniteQueryResult | UseQueryResult) & {
  pagination: UsePaginationReturn
  items: CrudItem[] | []
  count?: number
  fetchNextPage?: UseInfiniteQueryResult['fetchNextPage']
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
