import { useRouter } from 'next/router'

import useRouterQuery from './useRouterQuery'

export interface UsePaginationProps {
  count: number
  pageSize: number
}

export interface UsePaginationReturn {
  /**
   * The total number of items
   */
  count: number
  hasNextPage: boolean
  hasPrevPage: boolean
  nextPage: () => void
  /**
   * The current page number
   * Default: 1
   */
  page: number
  /**
   * The total number of pages = total items / items per page
   */
  pageCount: number
  /**
   * The total number of items per page
   */
  pageSize: number
  prevPage: () => void
  range: [number, number]
  setPage: (newPage: number) => void
}

const usePagination = (props: UsePaginationProps): UsePaginationReturn => {
  const { count, pageSize } = props

  const router = useRouter()
  const { pathname, query } = router

  const page = query?.page ? Number(query?.page) : 1
  const range: [number, number] = [page * pageSize - pageSize, pageSize * page]
  const pageCount = count / pageSize > 0 ? Math.ceil(count / pageSize) : 1
  const hasNextPage = page < pageCount
  const hasPrevPage = page > 1

  const { addQueryString } = useRouterQuery()

  const setPage = (newPage: number) => {
    // Page min must be 1.
    const nextPage = newPage > 0 ? newPage : 1

    // Feed the full query string here, but omit the queryParams
    return addQueryString({ page: String(nextPage) })
  }
  const nextPage = () => hasNextPage && setPage(page + 1)
  const prevPage = () => hasPrevPage && setPage(page - 1)

  return {
    count,
    hasNextPage,
    hasPrevPage,
    nextPage,
    page,
    pageCount,
    pageSize,
    prevPage,
    range,
    setPage,
  }
}

export default usePagination
