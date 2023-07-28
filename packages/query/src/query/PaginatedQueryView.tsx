import React, { useEffect } from 'react'
import uniq from 'lodash/uniq'
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  GridProps,
  Typography,
} from '@gravis-os/ui'
import useMeasure from 'react-use-measure'
import { Pagination, useTheme } from '@mui/material'
import { RenderPropsFunction } from '@gravis-os/types'
import { UseInfiniteQueryResult, UseQueryResult } from 'react-query'
import { useInView } from 'react-intersection-observer'
import { UsePaginationReturn } from './usePagination'

export const PAGINATED_QUERY_VIEW_GRID_ITEM_MIN_WIDTH = 350

export enum PaginatedQueryViewVariantEnum {
  Grid = 'grid',
  List = 'list',
}

export enum PaginatedQueryViewPaginationTypeEnum {
  InfiniteScroll = 'infinite-scroll',
  Pagination = 'pagination',
  LoadMore = 'load-more',
}

export interface PaginatedQueryViewRenderItemProps extends Record<string, any> {
  item: Record<string, any>
  queryResult?: PaginatedQueryViewProps['queryResult']
  variant: PaginatedQueryViewProps['variant']
}

export interface PaginatedQueryViewProps {
  // Item
  items?: Record<string, any>[]
  itemProps?: Record<string, any>
  renderItem: RenderPropsFunction<PaginatedQueryViewRenderItemProps>

  // ViewType
  variant?: PaginatedQueryViewVariantEnum

  // Grid View specific props
  gridProps?: GridProps
  gridItemProps?: GridProps

  // PaginationType
  pagination?: UsePaginationReturn
  paginationType?: PaginatedQueryViewPaginationTypeEnum
  queryResult: (UseInfiniteQueryResult | UseQueryResult) & {
    pagination: UsePaginationReturn
    items?: Record<string, any>[]
  }
}

const PaginatedQueryView: React.FC<PaginatedQueryViewProps> = (props) => {
  const {
    gridProps: injectedGridProps,
    gridItemProps: injectedGridItemProps,
    items,
    itemProps,
    paginationType,
    pagination,
    queryResult,
    renderItem,
    variant,
  } = props

  const renderItemProps = { variant, queryResult, ...itemProps }

  // Resize on drawer change
  const [measureRef, bounds] = useMeasure()
  const theme = useTheme()
  const minGridItemWidth = PAGINATED_QUERY_VIEW_GRID_ITEM_MIN_WIDTH
  const gridItemWidth = Math.floor(bounds?.width / minGridItemWidth)

  // View setup
  const isListVariant = variant === PaginatedQueryViewVariantEnum.List
  const gridProps = { ...injectedGridProps }
  const gridItemProps = {
    // Resize on drawer change
    ...(bounds?.width < theme.breakpoints.values.md && {
      md: 12 / gridItemWidth,
      lg: 12 / gridItemWidth,
      xl: 12 / gridItemWidth,
    }),
    // Reset grids if isListVariant
    ...(isListVariant && {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12,
    }),
    // Overrides with injected props
    ...injectedGridItemProps,
  }

  // InfiniteQuery setup
  const isInfiniteScroll =
    paginationType === PaginatedQueryViewPaginationTypeEnum.InfiniteScroll
  const isLoadMore =
    paginationType === PaginatedQueryViewPaginationTypeEnum.LoadMore
  const isInfinitePaginationType = isInfiniteScroll || isLoadMore
  const isRegularPagination =
    paginationType === PaginatedQueryViewPaginationTypeEnum.Pagination
  const { isLoading } = queryResult
  const hasNextToken = isInfinitePaginationType
    ? (queryResult as UseInfiniteQueryResult).hasNextPage
    : pagination?.hasNextPage

  // Resolve issue where nextToken always returns the same page
  // resulting in isInfinitePaginationTypes from never showing the end state
  // @note: This code here still results in one final cycle of duplication
  // Moving forward, we should test if the data is the same as the prev page.
  const pageParams = (queryResult?.data as any)?.pageParams || []
  const isPageParamsUnique = uniq(pageParams).length === pageParams.length
  const hasNextPage = hasNextToken && isPageParamsUnique

  const isFetchingNextPage =
    isInfinitePaginationType &&
    (queryResult as UseInfiniteQueryResult).isFetchingNextPage
  const fetchNextPage =
    isInfinitePaginationType &&
    (queryResult as UseInfiniteQueryResult).fetchNextPage
  const { ref, inView } = useInView()

  const shouldFetchNextPage =
    isInfiniteScroll && inView && !isLoading && hasNextPage

  // Effect: Infinite scroll
  useEffect(() => {
    if (shouldFetchNextPage) fetchNextPage()
  }, [shouldFetchNextPage])

  return (
    <div ref={measureRef}>
      <Grid container {...gridProps}>
        {items?.map((item) => {
          if (!item) return null
          return (
            <Grid key={item.id} item xs={12} md={4} {...gridItemProps}>
              {renderItem({ ...renderItemProps, item })}
            </Grid>
          )
        })}
      </Grid>

      {isInfinitePaginationType && (
        <Box ref={ref} sx={{ my: { xs: 2, md: 4 } }} center>
          {isLoading || isFetchingNextPage ? (
            <CircularProgress />
          ) : hasNextPage ? (
            <Button
              color="secondary"
              size="large"
              loading={isFetchingNextPage}
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              fullWidthOnMobile
            >
              Load More
            </Button>
          ) : (
            Boolean(items?.length) && (
              <Divider role="presentation" sx={{ width: '25%' }}>
                <Typography variant="caption" color="text.secondary">
                  End
                </Typography>
              </Divider>
            )
          )}
        </Box>
      )}

      {isRegularPagination && pagination && (
        <Box sx={{ my: { xs: 3, md: 6 } }} center>
          <Pagination
            size="large"
            disabled={queryResult.isFetching}
            showFirstButton={pagination.hasPrevPage}
            showLastButton={pagination.hasNextPage}
            hideNextButton={!pagination.hasNextPage}
            hidePrevButton={!pagination.hasPrevPage}
            count={pagination.pageCount}
            page={pagination.page}
            onChange={(_, newPageNumber) => pagination.setPage(newPageNumber)}
          />
        </Box>
      )}
    </div>
  )
}

export default PaginatedQueryView
