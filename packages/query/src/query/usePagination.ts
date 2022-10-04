import qs from 'qs'
import { useRouter } from 'next/router'

export interface UsePaginationProps {
  pageSize: number
  totalCount: number
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
  totalCount: number
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
  const { pageSize, totalCount } = props

  const router = useRouter()
  const { pathname, query } = router

  const page = query?.page ? Number(query?.page) : 1
  const range: [number, number] = [page * pageSize - pageSize, pageSize * page]

  const setPage = (newPage: number) => {
    // Page min must be 1.
    const nextPage = newPage > 0 ? newPage : 1
    const queryString = qs.stringify({ page: nextPage })
    return router.push(
      {
        pathname,
        query: {
          ...query,
          page: nextPage,
        },
      },
      `${router.asPath.split('?')[0]}?${queryString}`
    )
  }
  const nextPage = () => setPage(page + 1)
  const prevPage = () => setPage(page - 1)

  const pageCount =
    totalCount / pageSize > 0 ? Math.ceil(totalCount / pageSize) : 1

  return {
    page,
    pageSize,
    totalCount,
    pageCount,
    range,
    setPage,
    nextPage,
    prevPage,
    hasPrevPage: page > 1,
    hasNextPage: page < pageCount,
  }
}

export default usePagination
