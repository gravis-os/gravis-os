import React, { useEffect } from 'react'
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
import { CrudItem, RenderPropsFunction } from '@gravis-os/types'
import { UseInfiniteQueryResult, UseQueryResult } from 'react-query'
import { useInView } from 'react-intersection-observer'
import { UsePaginationReturn } from '@gravis-os/query'
import ListingCard, { ListingCardProps } from './ListingCard'
import ListingListItem, { ListingListItemProps } from './ListingListItem'
import { DirectoryVariantEnum, DirectoryPaginationTypeEnum } from './types'
import { DIRECTORY_LISTING_GRID_ITEM_MIN_WIDTH } from './constants'

const renderItemByDirectoryVariant = (props: DirectoryTemplateRenderProps) => {
  const { variant } = props
  switch (variant) {
    case DirectoryVariantEnum.Grid:
      return <ListingCard {...(props as unknown as ListingCardProps)} />
    case DirectoryVariantEnum.List:
      return <ListingListItem {...(props as unknown as ListingListItemProps)} />
    default:
      return <ListingCard {...(props as unknown as ListingCardProps)} />
  }
}

export interface DirectoryTemplateRenderProps extends Record<string, any> {
  item: CrudItem
  queryResult?: DirectoryListingsProps['queryResult']
  variant: DirectoryListingsProps['variant']
}

export interface DirectoryListingsProps {
  items?: CrudItem[]

  renderItem?: RenderPropsFunction<DirectoryTemplateRenderProps>
  itemProps?: Record<string, any>

  // Grid
  gridProps?: GridProps
  gridItemProps?: GridProps

  // PaginationType
  pagination?: UsePaginationReturn
  paginationType?: DirectoryPaginationTypeEnum
  queryResult: (UseInfiniteQueryResult | UseQueryResult) & {
    pagination: UsePaginationReturn
  }

  variant?: DirectoryVariantEnum
}

const DirectoryListings: React.FC<DirectoryListingsProps> = (props) => {
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

  const commonRenderItemProps = { variant, queryResult, ...itemProps }

  // Resize on drawer change
  const [measureRef, bounds] = useMeasure()
  const theme = useTheme()
  const minGridItemWidth = DIRECTORY_LISTING_GRID_ITEM_MIN_WIDTH
  const gridItemWidth = Math.floor(bounds?.width / minGridItemWidth)

  // View setup
  const isListVariant = variant === DirectoryVariantEnum.List
  const gridProps = { ...injectedGridProps }
  const gridItemProps = {
    ...injectedGridItemProps,
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
  }

  // InfiniteQuery setup
  const isInfiniteScroll =
    paginationType === DirectoryPaginationTypeEnum.InfiniteScroll
  const isLoadMore = paginationType === DirectoryPaginationTypeEnum.LoadMore
  const isInfinitePaginationType = isInfiniteScroll || isLoadMore
  const isRegularPagination =
    paginationType === DirectoryPaginationTypeEnum.Pagination
  const { isLoading } = queryResult
  const hasNextPage = isInfinitePaginationType
    ? (queryResult as UseInfiniteQueryResult).hasNextPage
    : pagination?.hasNextPage
  const isFetchingNextPage =
    isInfinitePaginationType &&
    (queryResult as UseInfiniteQueryResult).isFetchingNextPage
  const fetchNextPage =
    isInfinitePaginationType &&
    (queryResult as UseInfiniteQueryResult).fetchNextPage
  const { ref, inView } = useInView()

  // Effect: Infinite scroll
  useEffect(() => {
    if (isInfiniteScroll && inView && !isLoading && hasNextPage) fetchNextPage()
  }, [inView, isLoading, hasNextPage])

  return (
    <div ref={measureRef}>
      <Grid container {...gridProps}>
        {items?.map((item) => {
          if (!item) return null
          return (
            <Grid key={item.id} item xs={12} md={4} {...gridItemProps}>
              {renderItem
                ? renderItem({ item, ...commonRenderItemProps })
                : renderItemByDirectoryVariant({
                    item,
                    ...commonRenderItemProps,
                  })}
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

export default DirectoryListings
