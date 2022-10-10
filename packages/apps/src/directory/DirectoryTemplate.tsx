import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  GridProps,
  Typography,
} from '@gravis-os/ui'
import { CrudItem, RenderPropsFunction } from '@gravis-os/types'
import { UsePaginationReturn } from '@gravis-os/query'
import {
  Pagination,
  SwipeableDrawer,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { UseInfiniteQueryResult, UseQueryResult } from 'react-query'
import FilterAccordion from './FilterAccordion'
import { UseFilterDefsReturn } from './useFilterDefs'
import { UseSortDefsReturn } from './useSortDefs'
import FilterAppBar from './FilterAppBar'
import ListingCard, { ListingCardProps } from './ListingCard'
import ListingListItem, { ListingListItemProps } from './ListingListItem'

export enum DirectoryPaginationTypeEnum {
  InfiniteScroll = 'infinite-scroll',
  Pagination = 'pagination',
  LoadMore = 'load-more',
}

export enum DirectoryVariantEnum {
  Grid = 'grid',
  List = 'list',
  Map = 'map',
}

export interface DirectoryTemplateProps {
  title?: string
  items?: CrudItem[]
  variant?: DirectoryVariantEnum
  filterDrawerWidth?: number

  renderItem?: RenderPropsFunction<DirectoryTemplateRenderProps>
  useFilterDefsProps?: UseFilterDefsReturn
  useSortDefsProps?: UseSortDefsReturn

  gridProps?: GridProps
  gridItemProps?: GridProps

  /**
   * Additional itemProps
   */
  itemProps?: Record<string, any>

  // PaginationType
  pagination?: UsePaginationReturn
  paginationType?: DirectoryPaginationTypeEnum
  queryResult: (UseInfiniteQueryResult | UseQueryResult) & {
    pagination: UsePaginationReturn
  }
}

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
  queryResult?: DirectoryTemplateProps['queryResult']
  variant: DirectoryTemplateProps['variant']
}

/**
 * Base Directory Template with Listings, Pagination, Filter, Sort, Search, Compare
 * @param props
 * @constructor
 */
const DirectoryTemplate: React.FC<DirectoryTemplateProps> = (props) => {
  const {
    title,
    items,
    variant: injectedVariant = DirectoryVariantEnum.Grid,
    renderItem,
    itemProps,
    pagination,
    paginationType = DirectoryPaginationTypeEnum.Pagination,
    useFilterDefsProps,
    useSortDefsProps,
    gridProps: injectedGridProps,
    gridItemProps: injectedGridItemProps,
    filterDrawerWidth = 240,
    queryResult,
  } = props

  const isInfiniteScroll =
    paginationType === DirectoryPaginationTypeEnum.InfiniteScroll
  const isLoadMore = paginationType === DirectoryPaginationTypeEnum.LoadMore
  const isInfinitePaginationType = isInfiniteScroll || isLoadMore
  const isRegularPagination =
    paginationType === DirectoryPaginationTypeEnum.Pagination

  const {
    setFilterDrawerOpen,
    isFilterDrawerOpen,
    filterDefs,
    getHasFilterChip,
    filterChips,
  } = useFilterDefsProps

  // InfiniteQuery setup
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

  // Effect: Hide drawer on mobile, switch to overlay drawer
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true })
  useEffect(() => {
    if (isDesktop && !isFilterDrawerOpen) setFilterDrawerOpen(true)
    if (!isDesktop && isFilterDrawerOpen) setFilterDrawerOpen(false)
  }, [isDesktop])

  // Set view
  const [variant, setVariant] = useState(injectedVariant)
  useEffect(() => {
    if (variant !== injectedVariant) setVariant(injectedVariant)
  }, [injectedVariant])
  const isListVariant = variant === DirectoryVariantEnum.List
  const gridProps = { ...injectedGridProps }
  const gridItemProps = {
    ...injectedGridItemProps,
    // Reset grids if isListVariant
    ...(isListVariant && {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12,
    }),
  }
  const commonRenderItemProps = { variant, queryResult, ...itemProps }

  return (
    <>
      <FilterAppBar
        title={`${title}`}
        subtitle={`(${pagination?.count || items?.length} results)`}
        useFilterDefsProps={useFilterDefsProps}
        useSortDefsProps={useSortDefsProps}
        directoryVariant={variant}
        setDirectoryVariant={setVariant}
      />

      <Box>
        <Container maxWidth={false} disableGutters>
          {/* Directory */}
          <Box sx={{ display: 'flex' }}>
            {/* Filter Drawer */}
            <SwipeableDrawer
              open={isFilterDrawerOpen}
              variant={isDesktop ? 'permanent' : 'temporary'}
              {...(!isDesktop && {
                onClose: () => setFilterDrawerOpen(false),
                onOpen: () => setFilterDrawerOpen(true),
              })}
              sx={{
                '&, & .MuiDrawer-paper': {
                  width: '90%',
                  ...(isDesktop && {
                    height: 'initial',
                    width: isFilterDrawerOpen ? filterDrawerWidth : 0,
                    top: 48, // FilterAppBar height is always at 48
                    position: 'sticky',
                    transition: (theme) =>
                      theme.transitions.create(['width'], {
                        easing:
                          theme.transitions.easing[
                            isFilterDrawerOpen ? 'sharp' : 'easeOut'
                          ],
                        duration:
                          theme.transitions.duration[
                            isFilterDrawerOpen
                              ? 'leavingScreen'
                              : 'enteringScreen'
                          ],
                      }),
                  }),
                },
              }}
            >
              <Box
                sx={{
                  overflow: 'auto',
                  height: (theme) => `calc(100vh - ${theme.spacing(8)})`,
                }}
              >
                {filterDefs?.map((filterDef) => {
                  const { key, name } = filterDef

                  const defaultExpanded = getHasFilterChip(name) || true

                  const filterChipsWithCurrentFilterItemName =
                    filterChips.filter((filterChip) => filterChip.key === name)

                  const activeOptionLabels =
                    filterChipsWithCurrentFilterItemName
                      .map(({ value }) => value)
                      .flat()

                  return (
                    <FilterAccordion
                      key={key}
                      activeOptionLabels={activeOptionLabels}
                      useFilterDefsProps={useFilterDefsProps}
                      accordionProps={{ defaultExpanded }}
                      {...filterDef}
                    />
                  )
                })}
              </Box>
            </SwipeableDrawer>

            {/* Listings */}
            <Box component="main" sx={{ flexGrow: 1 }}>
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
                    onChange={(_, newPageNumber) =>
                      pagination.setPage(newPageNumber)
                    }
                  />
                </Box>
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default DirectoryTemplate
