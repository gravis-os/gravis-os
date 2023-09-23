/* eslint-disable unicorn/consistent-function-scoping, fp/no-loops, no-continue */

import { useEffect } from 'react'
import {
  QueryClient,
  UseInfiniteQueryResult,
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from 'react-query'

import { getRelationalObjectKey } from '@gravis-os/form'
import { CrudItem } from '@gravis-os/types'
import { getObjectWithGetters } from '@gravis-os/utils'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import flowRight from 'lodash/flowRight'
import groupBy from 'lodash/groupBy'
import isEmpty from 'lodash/isEmpty'
import partition from 'lodash/partition'
import pick from 'lodash/pick'
import uniqBy from 'lodash/uniqBy'
import { useRouter } from 'next/router'

import {
  SupabasePostgrestBuilderFiltersType,
  SupabasePostgrestFilterOperator,
  UseListFilters,
  UseListPaginationType,
  UseListProps,
  UseListReturn,
} from './types'
import usePagination from './usePagination'
import useRouterQuery from './useRouterQuery'

// ==============================
// Constants
// ==============================
const DEFAULT_PAGE_SIZE = 12

// ==============================
// Plugins
// ==============================
// Get only 'workspace' to 'workspace.slug' for .match({ 'workspace.slug': workspaceValue })
const withGetWorkspaceAndRenameWorkspaceToWorkspaceSlug =
  () => (props: UseListProps & UseListFilters) => {
    const { match, params } = props

    if (!params?.workspace) return props

    return {
      ...props,
      match: {
        ...match,
        'workspace.slug': params.workspace,
      },
    }
  }

const withLocale = () => (props: UseListProps & UseListFilters) => {
  const { locale, module, ors } = props
  const { hasLocales } = module

  if (!locale || !hasLocales) return props

  return {
    ...props,
    ors: [
      ...ors,
      `exclusive_locales.is.${null}, exclusive_locales.cs.{${[locale]}}`,
      `blocked_locales.is.${null}, blocked_locales.not.cs.{${[locale]}}`,
    ],
  }
}

const withPaginate = () => (props: UseListProps & UseListFilters) => {
  const { pagination = {} } = props
  const { page = 1, pageSize = DEFAULT_PAGE_SIZE, paginationType } = pagination

  const isRegularPagination =
    paginationType === UseListPaginationType.Pagination

  if (!isRegularPagination) return props

  return {
    ...props,
    range: [page * pageSize - pageSize, page * pageSize || 1000] as [
      number,
      number
    ],
  }
}

const getSort = (props) => {
  const { defaultSortOrder, parsedQs } = props

  // @example: { order: 'id.desc' }
  const { order: routerOrder } = parsedQs || {}
  const order = routerOrder || defaultSortOrder

  const defaultSortKey = 'created_at'
  const defaultSortDirection = 'desc'

  if (!order && typeof order !== 'string') {
    return [defaultSortKey, defaultSortDirection]
  }

  const [sortKey, sortDirection] = String(order).split('.')

  return [sortKey || defaultSortKey, sortDirection]
}
const withInfinitePaginate = () => (props: UseListProps & UseListFilters) => {
  const { limit, order, pagination = {} } = props
  const {
    pageParam,
    pageSize = DEFAULT_PAGE_SIZE,
    paginationType = UseListPaginationType.Infinite,
  } = pagination

  const isInfinitePagination = paginationType === UseListPaginationType.Infinite

  if (!isInfinitePagination) return props

  const [sortKey, sortDirection] = getSort(props)
  const isAscending = sortDirection === 'asc'
  const isInitialPageParam = pageParam === undefined
  const isDateSortKey = sortKey.endsWith('_at')
  /// Set an arbitrary large number for the initial limit.
  const initialNumberPageParam = isAscending ? 0 : 99_999_999
  // Set an arbitrary early date in the past if asc, else today's date if desc.
  const initialDatePageParam = isAscending
    ? '1900-01-01'
    : // Do not set time here or it will run into infinite loop.
      // Get tomorrow to ensure we capture the correct values.
      new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  const initialPageParam = isDateSortKey
    ? initialDatePageParam
    : initialNumberPageParam
  const nextPageParam = isInitialPageParam ? initialPageParam : pageParam

  return {
    ...props,
    // Set the location of the next cursor with this where clause
    [isAscending ? 'gte' : 'lte']: [sortKey, nextPageParam],
    limit: limit || pageSize,
    order: order || [sortKey, { ascending: isAscending, nullsFirst: true }],
    range: null,
  }
}
const withSort = () => (props: UseListProps & UseListFilters) => {
  const { order } = props
  const [sortKey, sortDirection] = getSort(props)

  if (order || !sortKey) return props

  return {
    ...props,
    order: [sortKey, { ascending: sortDirection === 'asc', nullsFirst: true }],
  }
}

const withPostgrestFilters = () => (props: UseListProps & UseListFilters) => {
  const { filterByQueryString, filters, parsedQs } = props

  if (!filterByQueryString || isEmpty(parsedQs)) return props

  const getArrayBasedFilterValue = (values: string[]) => `(${values.join(',')})`

  const getCombinedArrayBasedFilter = (
    key: string,
    op: string,
    filters: Record<string, any>[]
  ) => {
    return {
      key,
      op,
      value: getArrayBasedFilterValue(filters.map((filt) => filt.value)),
    }
  }

  // TODO: find all array based filters
  const arrayBasedOps = new Set(['in', 'not.in'])

  const getPartitionedFilters = (
    key: string,
    filters: Record<string, any>[]
  ) => {
    // @example qs = brand=in.1&price=lt.500&brand=in.5;
    // filter = [{ key: 'price', op: 'lt', value: '500' }, { key: 'brand', op: 'in', value: '(1,5)' }]

    const [arrayBasedFilters, otherFilters] = partition(filters, (filter) =>
      arrayBasedOps.has(filter.op)
    )

    const groupedArrayBasedFilters = groupBy(
      arrayBasedFilters,
      (filt) => filt.op
    )

    const combinedArrayBasedFilters = Object.entries(
      groupedArrayBasedFilters
    ).map(([op, filters]) => getCombinedArrayBasedFilter(key, op, filters))

    return [...otherFilters, ...combinedArrayBasedFilters]
  }

  /**
   * Let everything in the parsedQs go into the filters.
   * Just spread out the parsedQs into the filters.
   * price=lt.50 -> .filter('price', 'lt', '50')
   * directory_category_id=1 -> .filter('directory_category_id', 'eq', '1')
   * ?or=(directory_category_id.eq.14,age.lte.18)
   */
  const nextFilters = Object.entries(parsedQs).reduce(
    (acc, [key, injectedParsedQsValue]) => {
      if (key === 'order') return acc

      const parsedQsValue = String(injectedParsedQsValue)

      const getOpAndFilterValueFromParsedQsValue = (parsedQsValue: string) => {
        const parsedQsValueArr = parsedQsValue.split('.')
        return [
          parsedQsValueArr.slice(0, -1).join('.'),
          parsedQsValueArr.at(-1),
        ]
      }

      const getOpAndFilterValue = (parsedQsValue: string): string[] => {
        // Check if we have an op
        const isOpInParsedQsValue = parsedQsValue.includes('.')

        // Return eq as op by default
        if (!isOpInParsedQsValue) return ['eq', parsedQsValue]

        // Split the query into two parts by the last period
        // @example qs = brand=not.in.1; [op, filterValue] = ['not.in', '1']
        const [op, filterValue] =
          getOpAndFilterValueFromParsedQsValue(parsedQsValue)

        // If op is ilike, add `%`
        if (op === 'ilike') return [op, `%${filterValue}%`]

        return [op, filterValue]
      }

      // Early terminate on multiple filters
      const isMultipleFilterOnTheSameColumn =
        Array.isArray(injectedParsedQsValue) && injectedParsedQsValue.length > 1

      if (isMultipleFilterOnTheSameColumn) {
        // @example qs = price=lt.300&price=gt.100; parsedQsValue = ['lt.300', 'gt.100']
        const nextFilters = (
          injectedParsedQsValue as Record<string, any>
        ).reduce((acc, parsedQsValueItem) => {
          const [op, filterValue] = getOpAndFilterValue(parsedQsValueItem)
          const newFilter = { key, op, value: filterValue }
          return acc.concat(newFilter)
        }, [])
        const partitionedFilters = getPartitionedFilters(key, nextFilters)
        return [...acc, ...partitionedFilters]
      }

      // Single filter
      const [op, filterValue] = getOpAndFilterValue(parsedQsValue)
      const newFilter = {
        key,
        op,
        value: arrayBasedOps.has(op)
          ? getArrayBasedFilterValue([filterValue])
          : filterValue,
      } as unknown as SupabasePostgrestBuilderFiltersType

      return acc.concat(newFilter)
    },
    filters as SupabasePostgrestBuilderFiltersType[]
  )

  return {
    ...props,
    filters: nextFilters,
  }
}

// ==============================
// Core
// ==============================
// Matcher
export const getUseListFilters = (props: UseListProps): UseListFilters => {
  const { disableWorkspacePlugin, plugins = [] } = props
  return pick(
    flowRight(
      [
        ...plugins,
        withPostgrestFilters(),
        withSort(),
        withInfinitePaginate(),
        withPaginate(),
        withLocale(),
        !disableWorkspacePlugin &&
          withGetWorkspaceAndRenameWorkspaceToWorkspaceSlug(),
      ].filter(Boolean)
    )({
      contains: null,
      filters: [],
      gt: null,
      gte: null,
      limit: null,
      lt: null,
      lte: null,
      // Initialize defaults here
      match: {},
      not: null,
      order: null,
      ors: [],
      range: [0, 1000],
      ...props,
    }),
    [
      'match',
      'filters',
      'ors',
      'limit',
      'range',
      'order',
      'gt',
      'lt',
      'gte',
      'lte',
      'select',
      'not',
      'contains',
    ]
  ) as UseListFilters
}

// QueryKey
export const getFetchListQueryKey = (props: UseListProps) => {
  const { module } = props
  return [module.table.name, 'list', getUseListFilters(props)]
}

// Fetcher
export const getFetchListQueryFn = (props: UseListProps) => {
  const { module, pagination = {}, setQuery } = props

  const { countOnly } = pagination
  const countProps = countOnly ? { head: true } : {}

  return async (getFetchListProps) => {
    const { pageParam } = getFetchListProps

    const listFilters = getUseListFilters({
      ...props,
      pagination: {
        ...props.pagination,
        pageParam,
      },
    })

    const {
      contains,
      filters,
      gt,
      gte,
      limit,
      lt,
      lte,
      match,
      not,
      order,
      ors,
      range,
      select,
    } = listFilters

    const getSelectString = () => {
      if (countOnly) {
        return module?.select?.count || '*'
      }

      // @ts-ignore
      const filterSelect = module?.select?.filter
      if (filters?.length && filterSelect) {
        return filterSelect
      }

      return select || module?.select?.list || '*'
    }

    // @note: The order of the filters below matter.
    // Setup query
    const query = supabaseClient
      .from(module.table.name)
      .select(getSelectString(), {
        // This is both the HEAD and GET query as this count gets overriden from above.
        count: 'exact',
        ...countProps,
      })

    // Apply filters
    if (match) query.match(match)
    if (filters?.length) {
      const relationalObjectKeys = new Set(
        filters
          .filter((filter) => filter && filter.key.endsWith('_id'))
          .flatMap((filter) => {
            const relationalObjectKey = getRelationalObjectKey(
              filter.key,
              false
            )

            // the relational object key might not be direct e.g
            // lines.order_form_line.order_form.sales_order.project_id=2&project_id=2&project=Fusheng+House
            // we need to remove the query params that are only there to support FilterForm: project and project_id
            if (`${relationalObjectKey}_id` !== filter.key) {
              return [relationalObjectKey, `${relationalObjectKey}_id`]
            }

            return [relationalObjectKey]
          })
      )
      for (const filter of filters) {
        if (filter && !relationalObjectKeys.has(filter.key)) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          query.filter(filter.key, filter.op, filter.value)
        }
      }
    }
    if (ors?.length) {
      for (const or of ors) {
        if (Array.isArray(or)) {
          query.or(or[0], or[1])
          continue
        }
        query.or(or)
        continue
      }
    }
    if (gt) query.gt(gt[0], gt[1])
    if (lt) query.lt(lt[0], lt[1])
    if (gte) query.gte(gte[0], gte[1])
    if (lte) query.lte(lte[0], lte[1])
    if (contains) query.contains(contains[0], contains[1])

    // @example { not: ['avatar_src', 'is', null] }
    if (not) {
      query.not(not[0], not[1] as SupabasePostgrestFilterOperator, not[2])
    }

    // Terminate early for countOnly
    if (countOnly) return query

    // For sort
    if (order) query.order(order[0], order[1])

    // For pagination
    if (range) query.range(range[0], range[1] - 1)

    // Ensure to always limit last
    if (limit) query.limit(limit)

    // Allow user to override the query
    if (setQuery) return setQuery(query)

    return query
  }
}

// Prefetch
export const prefetchListQuery = async (
  queryClient: QueryClient,
  props: UseListProps
) => {
  return queryClient.prefetchQuery(
    getFetchListQueryKey(props),
    getFetchListQueryFn(props)
  )
}

const getItemsFromPages = (pages) => {
  if (!pages) return
  const data = pages?.reduce((acc, { data }) => acc.concat(data), [])
  return uniqBy(data, 'id')
}

// Hook
const useList = (props: UseListProps): UseListReturn => {
  const {
    disablePagination,
    module,
    pagination = {},
    params: injectedParams,
    queryOptions,
  } = props
  const {
    pageSize = DEFAULT_PAGE_SIZE,
    paginationType = UseListPaginationType.Infinite,
  } = pagination

  const isInfinitePagination = paginationType === UseListPaginationType.Infinite
  const isRegularPagination =
    paginationType === UseListPaginationType.Pagination

  const router = useRouter()
  const { defaultLocale, locale, locales, query } = router
  const params = injectedParams || query
  const page = query?.page ? Number(query?.page) : 1
  const { parsedQs } = useRouterQuery()

  // Pass through router props to simulate getStaticPropsContext on the client
  const nextProps = {
    ...props,
    defaultLocale,
    locale,
    locales,
    pagination: {
      ...props.pagination,
      page,
      pageSize,
    },
    params,
    parsedQs,
    router,
  }

  const listQueryKey = getFetchListQueryKey(nextProps)
  const listQueryFn = getFetchListQueryFn(nextProps)

  // Fire a separate count query function to fetch the count for infinitePagination
  const countQuery = useQuery(
    [listQueryKey, 'count'],
    getFetchListQueryFn({
      ...nextProps,
      pagination: { ...nextProps.pagination, countOnly: true },
    }),
    {
      enabled: Boolean(isInfinitePagination || !disablePagination),
      ...queryOptions,
    }
  )
  const countFromCountQuery = (countQuery?.data as any)?.count

  // Switch between useQuery and useInfiniteQuery
  const useQueryFn = isInfinitePagination ? useInfiniteQuery : useQuery
  const onUseQuery = useQueryFn(listQueryKey, listQueryFn, {
    keepPreviousData: isRegularPagination,
    ...(isInfinitePagination && {
      // Calculate nextToken. Only applicable for infinite pagination
      getNextPageParam: (lastPage, pages) => {
        const [sortKey] = getSort(nextProps)
        const lastPageData = (lastPage?.data as CrudItem[] | null) || []
        const nextIndex = lastPageData.length - 1
        const nextToken = lastPageData[nextIndex]?.[sortKey]
        // Do not return null or undefined here, or it will be sent as the next payload as a param
        return nextToken
      },
    }),
    ...queryOptions,
  })
  const {
    data,
  }: {
    data: { count?: number; data?: any; pages?: unknown }
  } = onUseQuery
  const items =
    (isInfinitePagination ? getItemsFromPages(data?.pages) : data?.data) || []
  const count = (isInfinitePagination ? countFromCountQuery : data?.count) || 0

  // Prefetch next page for regular pagination only
  const onUsePagination = usePagination({ count, pageSize })
  const queryClient = useQueryClient()
  useEffect(() => {
    if (isRegularPagination && onUsePagination.hasNextPage) {
      const prefetchNextPageProps = {
        ...nextProps,
        pagination: {
          page: page + 1,
        },
      }
      queryClient.prefetchQuery(
        getFetchListQueryKey(prefetchNextPageProps),
        getFetchListQueryFn(prefetchNextPageProps)
      )
    }
  }, [isRegularPagination, onUsePagination.hasNextPage, page, queryClient])

  // Add virtuals
  const itemsWithVirtuals = items
    ?.map((item) => getObjectWithGetters(item, module.virtuals))
    ?.filter(Boolean)

  // Override fetchNextPage for infiniteQuery
  const getInfinitePaginationFetchNextPage = (
    onUseQuery: UseInfiniteQueryResult
  ) => {
    const { fetchNextPage, isFetching } = onUseQuery
    const isQueryDisabled = queryOptions?.enabled === false
    // Fetch next page when query is not disabled and not currently fetching
    const shouldFetchNextPage = !isQueryDisabled && !isFetching
    const nextFetchNextPage = shouldFetchNextPage ? fetchNextPage : () => null
    return { fetchNextPage: nextFetchNextPage }
  }

  return {
    ...onUseQuery,
    pagination: onUsePagination,

    // fetchNextPage
    ...(isInfinitePagination &&
      getInfinitePaginationFetchNextPage(onUseQuery as UseInfiniteQueryResult)),

    count: countFromCountQuery,
    // Aliases
    items: itemsWithVirtuals,
  }
}

export default useList
