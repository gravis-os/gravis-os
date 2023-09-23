import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { UseInfiniteQueryResult, UseQueryResult } from 'react-query'
import useMeasure from 'react-use-measure'

import { RenderPropsFunction } from '@gravis-os/types'
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  GridProps,
  Typography,
} from '@gravis-os/ui'
import { Pagination, useTheme } from '@mui/material'
import uniq from 'lodash/uniq'

import { UsePaginationReturn } from './usePagination'

export const PAGINATED_QUERY_VIEW_GRID_ITEM_MIN_WIDTH = 350

export enum PaginatedQueryViewVariantEnum {
  Grid = 'grid',
  List = 'list',
}

export enum PaginatedQueryViewPaginationTypeEnum {
  InfiniteScroll = 'infinite-scroll',
  LoadMore = 'load-more',
  Pagination = 'pagination',
}

export interface PaginatedQueryViewRenderItemProps extends Record<string, any> {
  item: Record<string, any>
  queryResult?: PaginatedQueryViewProps['queryResult']
  variant: PaginatedQueryViewProps['variant']
}

export interface PaginatedQueryViewProps {
  gridItemProps?: GridProps
  // Grid View specific props
  gridProps?: GridProps
  itemProps?: Record<string, any>

  // Item
  items?: Record<string, any>[]

  // PaginationType
  pagination?: UsePaginationReturn
  paginationType?: PaginatedQueryViewPaginationTypeEnum

  queryResult: (UseInfiniteQueryResult | UseQueryResult) & {
    items?: Record<string, any>[]
    pagination: UsePaginationReturn
  }
  renderItem: RenderPropsFunction<PaginatedQueryViewRenderItemProps>
  // ViewType
  variant?: PaginatedQueryViewVariantEnum
}

const PaginatedQueryView: React.FC<PaginatedQueryViewProps> = (props) => {
  const {
    gridItemProps: injectedGridItemProps,
    gridProps: injectedGridProps,
    itemProps,
    items,
    pagination,
    paginationType,
    queryResult,
    renderItem,
    variant,
  } = props

  const renderItemProps = { queryResult, variant, ...itemProps }

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
  const { data, isFetching, isLoading } = queryResult
  const hasNextToken = isInfinitePaginationType
    ? (queryResult as UseInfiniteQueryResult).hasNextPage
    : pagination?.hasNextPage

  // Resolve issue where nextToken always returns the same page
  // resulting in isInfinitePaginationTypes from never showing the end state
  // @note: This code here still results in one final cycle of duplication
  // Moving forward, we should test if the data is the same as the prev page.
  const pageParams = (data as any)?.pageParams || []
  const isPageParamsUnique = uniq(pageParams).length === pageParams.length
  const hasNextPage = hasNextToken && isPageParamsUnique

  const isFetchingNextPage =
    isInfinitePaginationType &&
    (queryResult as UseInfiniteQueryResult).isFetchingNextPage
  const fetchNextPage =
    isInfinitePaginationType &&
    (queryResult as UseInfiniteQueryResult).fetchNextPage
  const { inView, ref } = useInView()

  const shouldFetchNextPage =
    isInfiniteScroll && inView && !isLoading && hasNextPage

  const loadingJsx = hasNextPage ? (
    <Button
      color="secondary"
      disabled={isFetchingNextPage}
      fullWidthOnMobile
      loading={isFetchingNextPage}
      onClick={() => fetchNextPage()}
      size="large"
    >
      Load More
    </Button>
  ) : (
    Boolean(items?.length) && (
      <Divider role="presentation" sx={{ width: '25%' }}>
        <Typography color="text.secondary" variant="caption">
          End
        </Typography>
      </Divider>
    )
  )

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
            <Grid item key={item.id} md={4} xs={12} {...gridItemProps}>
              {renderItem({ ...renderItemProps, item })}
            </Grid>
          )
        })}
      </Grid>

      {isInfinitePaginationType && (
        <Box center ref={ref} sx={{ my: { xs: 2, md: 4 } }}>
          {isLoading || isFetchingNextPage ? <CircularProgress /> : loadingJsx}
        </Box>
      )}

      {isRegularPagination && pagination && (
        <Box center sx={{ my: { xs: 3, md: 6 } }}>
          <Pagination
            count={pagination.pageCount}
            disabled={isFetching}
            hideNextButton={!pagination.hasNextPage}
            hidePrevButton={!pagination.hasPrevPage}
            onChange={(_, newPageNumber) => pagination.setPage(newPageNumber)}
            page={pagination.page}
            showFirstButton={pagination.hasPrevPage}
            showLastButton={pagination.hasNextPage}
            size="large"
          />
        </Box>
      )}
    </div>
  )
}

export default PaginatedQueryView
