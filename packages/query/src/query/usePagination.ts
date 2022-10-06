import qs from 'qs'
import { useRouter } from 'next/router'
import useRouterQuery from './useRouterQuery'

export interface UsePaginationProps {
  pageSize: number
  count: number
}

export interface UsePaginationReturn {
  /**
   * The current page number
   * Default: 1
   */
  page: number
  /**
   * The total number of items per page
   */
  pageSize: number
  /**
   * The total number of items
   */
  count: number
  /**
   * The total number of pages = total items / items per page
   */
  pageCount: number
  range: [number, number]
  setPage: (newPage: number) => void
  nextPage: () => void
  prevPage: () => void
  hasPrevPage: boolean
  hasNextPage: boolean
}

const usePagination = (props: UsePaginationProps): UsePaginationReturn => {
  const { pageSize, count } = props

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

    //  Feed the full query string here, but omit the queryParams
    return addQueryString({ page: String(nextPage) })
  }
  const nextPage = () => hasNextPage && setPage(page + 1)
  const prevPage = () => hasPrevPage && setPage(page - 1)

  return {
    page,
    pageSize,
    count,
    pageCount,
    range,
    setPage,
    nextPage,
    prevPage,
    hasPrevPage,
    hasNextPage,
  }
}

export default usePagination
