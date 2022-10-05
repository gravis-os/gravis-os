import React, { forwardRef, useEffect } from 'react'
import {
  Box,
  CircularProgress,
  Container,
  Drawer,
  Grid,
  GridProps,
} from '@gravis-os/ui'
import InfiniteScroll from 'react-infinite-scroller'
import { CrudItem, RenderPropsFunction } from '@gravis-os/types'
import { UsePaginationReturn } from '@gravis-os/query'
import {
  SwipeableDrawer,
  Pagination,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import FilterAccordion from './FilterAccordion'
import { UseFilterDefsReturn } from './useFilterDefs'
import { UseSortDefsReturn } from './useSortDefs'
import { InfiniteScrollProps } from './types'
import FilterAppBar from './FilterAppBar'

export interface DirectoryTemplateRenderProps {
  item: CrudItem
  loading?: boolean
}

export enum DirectoryPageScrollEnum {
  InfiniteScroll = 'infinite-scroll',
  Pagination = 'pagination',
}
export enum DirectoryVariantEnum {
  Grid = 'grid',
  List = 'list',
  Map = 'map',
}

export interface DirectoryTemplateProps {
  title?: string
  items?: CrudItem[]
  loading?: boolean
  renderItem: RenderPropsFunction<DirectoryTemplateRenderProps>
  useFilterDefsProps?: UseFilterDefsReturn
  useSortDefsProps?: UseSortDefsReturn
  infiniteScrollProps?: InfiniteScrollProps
  paginationProps?: UsePaginationReturn
  gridProps?: GridProps
  gridItemProps?: GridProps

  variant?: DirectoryVariantEnum
  pageScrollType?: DirectoryPageScrollEnum
  filterDrawerWidth?: number
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
    loading,
    renderItem,
    infiniteScrollProps,
    paginationProps,
    useFilterDefsProps,
    useSortDefsProps,
    gridProps,
    gridItemProps,
    variant = DirectoryVariantEnum.Grid,
    pageScrollType = DirectoryPageScrollEnum.Pagination,
    filterDrawerWidth = 240,
  } = props

  const {
    setFilterDrawerOpen,
    isFilterDrawerOpen,
    filterDefs,
    getHasFilterChip,
    filterChips,
  } = useFilterDefsProps

  const isInfiniteScroll =
    pageScrollType === DirectoryPageScrollEnum.InfiniteScroll

  // Effects
  // Hide drawer on mobile, switch to overlay drawer
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true })
  useEffect(() => {
    if (isDesktop && !isFilterDrawerOpen) setFilterDrawerOpen(true)
    if (!isDesktop && isFilterDrawerOpen) setFilterDrawerOpen(false)
  }, [isDesktop])

  return (
    <>
      <FilterAppBar
        title={`${title}`}
        subtitle={`(${paginationProps?.totalCount} results)`}
        useFilterDefsProps={useFilterDefsProps}
        useSortDefsProps={useSortDefsProps}
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
                  const { key, name, options } = filterDef

                  const defaultExpanded = getHasFilterChip(name) || true

                  const filterChipsWithCurrentFilterItemName =
                    filterChips.filter((filterChip) => filterChip.key === name)
                  const activeOptionLabels =
                    filterChipsWithCurrentFilterItemName
                      .map(({ value }) => value)
                      .flat()

                  const hasOptions = options?.length
                  if (!hasOptions) return null

                  return (
                    <FilterAccordion
                      key={key}
                      activeOptionLabels={activeOptionLabels}
                      defaultExpanded={defaultExpanded}
                      {...filterDef}
                    />
                  )
                })}
              </Box>
            </SwipeableDrawer>

            {/* Listings */}
            <Box component="main" sx={{ flexGrow: 1 }}>
              <InfiniteScroll
                {...({
                  element: forwardRef(
                    (props: { children: React.ReactNode }, ref: any) => {
                      return (
                        <Grid ref={ref} container {...gridProps} {...props} />
                      )
                    }
                  ),
                  // element: Grid,
                  loader: (
                    <Box key="loader" width="100%" center py={2}>
                      <CircularProgress size={32} />
                    </Box>
                  ),
                  ...(isInfiniteScroll
                    ? infiniteScrollProps
                    : {
                        loadMore: () => null,
                        hasMore: false,
                      }),
                } as InfiniteScrollProps)}
              >
                {items?.map((item) => (
                  <Grid key={item.id} item xs={12} md={4} {...gridItemProps}>
                    {renderItem({ item, loading })}
                  </Grid>
                ))}
              </InfiniteScroll>

              {!isInfiniteScroll && (
                <Box sx={{ my: { xs: 3, md: 6 } }} center>
                  <Pagination
                    size="large"
                    disabled={loading}
                    showFirstButton={paginationProps.hasPrevPage}
                    showLastButton={paginationProps.hasNextPage}
                    hideNextButton={!paginationProps.hasNextPage}
                    hidePrevButton={!paginationProps.hasPrevPage}
                    count={paginationProps.pageCount}
                    page={paginationProps.page}
                    onChange={(_, newPageNumber) =>
                      paginationProps.setPage(newPageNumber)
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
