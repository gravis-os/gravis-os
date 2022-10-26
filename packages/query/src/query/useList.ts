import { useEffect } from 'react'
import {
  QueryClient,
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from 'react-query'
import { useRouter } from 'next/router'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import flowRight from 'lodash/flowRight'
import uniqBy from 'lodash/uniqBy'
import pick from 'lodash/pick'
import isEmpty from 'lodash/isEmpty'
import usePagination from './usePagination'
import useRouterQuery from './useRouterQuery'
import {
  SupabasePostgrestBuilderFiltersType,
  UseListFilters,
  UseListPaginationType,
  UseListProps,
  UseListReturn,
} from './types'

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
    const { params, match } = props

    if (!params) return props

    return {
      ...props,
      match: {
        ...match,
        'workspace.slug': params.workspace,
      },
    }
  }

const withLocale = () => (props: UseListProps & UseListFilters) => {
  const { module, locale, ors } = props
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
  const { parsedQs } = props
  const { order } = parsedQs || {}

  const defaultSortKey = 'created_at'
  const defaultSortDirection = 'desc'

  if (!order && typeof order !== 'string') {
    return [defaultSortKey, defaultSortDirection]
  }

  const [sortKey, sortDirection] = String(order).split('.')

  return [sortKey || defaultSortKey, sortDirection]
}
const withInfinitePaginate = () => (props: UseListProps & UseListFilters) => {
  const { pagination = {} } = props
  const { paginationType, pageSize = DEFAULT_PAGE_SIZE, pageParam } = pagination

  const isInfinitePagination = paginationType === UseListPaginationType.Infinite

  if (!isInfinitePagination) return props

  const [sortKey, sortDirection] = getSort(props)
  const isAscending = sortDirection === 'asc'
  const isInitialPageParam = typeof pageParam === 'undefined'
  const isDateSortKey = sortKey.endsWith('_at')
  /// Set an arbitrary large number for the initial limit.
  const initialNumberPageParam = isAscending ? 0 : 99999999
  // Set an arbitrary early date in the past if asc, else today's date if desc.
  const initialDatePageParam = isAscending
    ? '1900-01-01'
    : // Do not set time here or it will run into infinite loop.
      // Get tomorrow to ensure we capture the correct values.
      new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0]
  const initialPageParam = isDateSortKey
    ? initialDatePageParam
    : initialNumberPageParam
  const nextPageParam = isInitialPageParam ? initialPageParam : pageParam

  return {
    ...props,
    range: null,
    limit: pageSize,
    // Set the location of the next cursor with this where clause
    [isAscending ? 'gte' : 'lte']: [sortKey, nextPageParam],
    order: [sortKey, { ascending: isAscending }],
  }
}
const withSort = () => (props: UseListProps & UseListFilters) => {
  const { order } = props
  const [sortKey, sortDirection] = getSort(props)

  if (order || !sortKey) return props

  return {
    ...props,
    order: [sortKey, { ascending: sortDirection === 'asc' }],
  }
}

const withPostgrestFilters = () => (props: UseListProps & UseListFilters) => {
  const { filterByQueryString, filters, parsedQs } = props

  if (!filterByQueryString || isEmpty(parsedQs)) return props

  /**
   * Let everything in the parsedQs go into the filters.
   * Just spread out the parsedQs into the filters.
   * price=lt.50 -> .filter('price', 'lt', '50')
   * directory_category_id=1 -> .filter('directory_category_id', 'eq', '1')
   * ?or=(directory_category_id.eq.14,age.lte.18)
   */
  const nextFilters = Object.entries(parsedQs).reduce(
    (acc, [key, parsedQsValue]) => {
      if (key === 'order') return acc

      const isMultipleFilterOnTheSameColumn = Array.isArray(parsedQsValue)
      if (isMultipleFilterOnTheSameColumn) {
        // qs = price=lt.300&price=gt.100; parsedQsValue = ['lt.300', 'gt.100']
        const nextFilters = (parsedQsValue as Record<string, any>).reduce(
          (acc, parsedQsValueItem) => {
            const [op, filterValue] = String(parsedQsValueItem).split('.')
            const newFilter = { key, op, value: filterValue }
            return acc.concat(newFilter)
          },
          []
        )
        return [...acc, ...nextFilters]
      }

      const [op, filterValue] = String(parsedQsValue).split('.')
      const newFilter = {
        key,
        op,
        value: filterValue,
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
  const { plugins = [] } = props
  return pick(
    flowRight([
      ...plugins,
      withPostgrestFilters(),
      withSort(),
      withInfinitePaginate(),
      withPaginate(),
      withLocale(),
      withGetWorkspaceAndRenameWorkspaceToWorkspaceSlug(),
    ])({
      // Initialize defaults here
      match: {},
      filters: [],
      ors: [],
      limit: null,
      range: [0, 1000],
      order: null,
      gt: null,
      lt: null,
      gte: null,
      lte: null,
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
    ]
  ) as UseListFilters
}

// QueryKey
export const getFetchListQueryKey = (props: UseListProps) => {
  const { module } = props
  return [module.table.name, 'list', getUseListFilters(props)]
}

// Fetcher
export const getFetchList = (props: UseListProps) => {
  const { module, pagination = {} } = props

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
      match,
      filters,
      ors,
      limit,
      range,
      order,
      gt,
      lt,
      gte,
      lte,
      select,
    } = listFilters

    // Setup query
    // @note: The order of the filters below matter.
    const query = supabaseClient
      .from(module.table.name)
      .select(select || module?.select?.list || '*', {
        count: 'exact',
        ...countProps,
      })

    // Apply filters
    if (match) query.match(match)
    if (filters?.length) {
      filters.forEach((filter) => {
        if (filter) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          query.filter(filter.key, filter.op, filter.value)
        }
      })
    }
    if (ors?.length) {
      ors.forEach((or) => {
        if (Array.isArray(or)) return query.or(or[0], or[1])
        return query.or(or)
      })
    }
    if (gt) query.gt(gt[0], gt[1])
    if (lt) query.lt(lt[0], lt[1])
    if (gte) query.gte(gte[0], gte[1])
    if (lte) query.lte(lte[0], lte[1])

    // Terminate early for countOnly
    if (countOnly) return query

    // For sort
    if (order) query.order(order[0], order[1])

    // For pagination
    if (range) query.range(range[0], range[1] - 1)

    // Ensure to always limit last
    if (limit) query.limit(limit)

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
    getFetchList(props)
  )
}

// Hook
const useList = (props: UseListProps): UseListReturn => {
  const { params: injectedParams, pagination = {}, queryOptions } = props
  const {
    pageSize = DEFAULT_PAGE_SIZE,
    paginationType = UseListPaginationType.Infinite,
  } = pagination

  const isInfinitePagination = paginationType === UseListPaginationType.Infinite
  const isRegularPagination =
    paginationType === UseListPaginationType.Pagination

  const router = useRouter()
  const { query, defaultLocale, locale, locales } = router
  const params = injectedParams || query
  const page = query?.page ? Number(query?.page) : 1

  const { parsedQs } = useRouterQuery()

  // Pass through router props to simulate getStaticPropsContext on the client
  const nextProps = {
    ...props,
    params,
    defaultLocale,
    locale,
    locales,
    router,
    parsedQs,
    pagination: {
      ...props.pagination,
      page,
      pageSize,
    },
  }

  const listQueryKey = getFetchListQueryKey(nextProps)
  const fetchList = getFetchList(nextProps)

  // Fire a separate count query function to fetch the count for infinitePagination
  const countQuery = useQuery(
    [listQueryKey, 'count'],
    getFetchList({
      ...nextProps,
      pagination: { ...nextProps.pagination, countOnly: true },
    }),
    { enabled: Boolean(isInfinitePagination) }
  )
  const countFromCountQuery = countQuery?.data?.count

  // Switch between useQuery and useInfiniteQuery
  const useQueryFn = isInfinitePagination ? useInfiniteQuery : useQuery
  const onUseQuery = useQueryFn(listQueryKey, fetchList, {
    keepPreviousData: isRegularPagination,
    ...(isInfinitePagination && {
      // Calculate nextToken. Only applicable for infinite pagination
      getNextPageParam: (lastPage, pages) => {
        const [sortKey] = getSort(nextProps)
        const lastPageData = (lastPage?.data as [] | null) || []
        const nextIndex = lastPageData.length - 1
        const nextToken = lastPageData[nextIndex]?.[sortKey]
        return nextToken
      },
    }),
    ...queryOptions,
  })
  const {
    data,
  }: {
    data: { pages?: unknown; data?: any; count?: number }
  } = onUseQuery
  const getItemsFromPages = (pages) => {
    if (!pages) return
    return uniqBy(
      pages?.reduce((acc, { data }) => acc.concat(data), []),
      'id'
    )
  }
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
        getFetchList(prefetchNextPageProps)
      )
    }
  }, [isRegularPagination, onUsePagination.hasNextPage, page, queryClient])

  return {
    ...onUseQuery,
    pagination: onUsePagination,
    // Aliases
    items,
  }
}

export default useList
