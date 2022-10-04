import React from 'react'
import {
  Box,
  CircularProgress,
  Container,
  Drawer,
  Grid,
  Paper,
  PaperProps,
} from '@gravis-os/ui'
import InfiniteScroll from 'react-infinite-scroller'
import { CrudItem, RenderPropsFunction } from '@gravis-os/types'
import { UsePaginationReturn } from '@gravis-os/query'
import { Pagination } from '@mui/material'
import FilterAccordion from './FilterAccordion'
import { UseFilterDefsReturn } from './useFilterDefs'
import { InfiniteScrollProps } from './types'

export interface DirectoryWithFilterRenderProps {
  item: CrudItem
}

export interface DirectoryWithFilterProps {
  items?: CrudItem[]
  renderItem: RenderPropsFunction<DirectoryWithFilterRenderProps>
  useFilterDefsProps?: UseFilterDefsReturn
  infiniteScrollProps?: InfiniteScrollProps
  paginationProps?: UsePaginationReturn
}

const DirectoryWithFilter: React.FC<DirectoryWithFilterProps> = (props) => {
  const {
    items,
    renderItem,
    infiniteScrollProps: injectedInfiniteScrollProps,
    paginationProps,
    useFilterDefsProps,
  } = props

  const { isFilterDrawerOpen, filterDefs, getHasFilterChip, filterChips } =
    useFilterDefsProps

  // TODO@Joel: Fix image with image double flickering
  // TODO@Joel: Allow use to switch between infinite or pagination
  // TODO@Joel: Hide drawer on mobile, switch to overlay drawer
  // TODO@Joel: Switch directory.type to list view
  return (
    <Box>
      <Container maxWidth={false} disableGutters>
        {/* Directory */}
        <Box sx={{ display: 'flex' }}>
          {/* Filter Drawer */}
          <Drawer
            open={isFilterDrawerOpen}
            variant="permanent"
            sx={{
              '&, & .MuiDrawer-paper': {
                height: 'initial',
                // @TODO@Joel: Remove these hardcodes
                width: isFilterDrawerOpen ? 240 : 0,
                position: 'sticky',
                // @TODO@Joel: Remove these hardcodes
                top: (theme) => theme.spacing(6),
                transition: (theme) =>
                  theme.transitions.create(['width'], {
                    easing:
                      theme.transitions.easing[
                        isFilterDrawerOpen ? 'sharp' : 'easeOut'
                      ],
                    duration:
                      theme.transitions.duration[
                        isFilterDrawerOpen ? 'leavingScreen' : 'enteringScreen'
                      ],
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
              {filterDefs?.map((filterItem) => {
                const defaultExpanded =
                  getHasFilterChip(filterItem.name) || true
                const filterChipsWithCurrentFilterItemName = filterChips.filter(
                  (filterChip) => filterChip.key === filterItem.name
                )
                const activeOptionLabels = filterChipsWithCurrentFilterItemName
                  .map(({ value }) => value)
                  .flat()

                return (
                  <FilterAccordion
                    activeOptionLabels={activeOptionLabels}
                    key={filterItem.name}
                    defaultExpanded={defaultExpanded}
                    {...filterItem}
                  />
                )
              })}
            </Box>
          </Drawer>

          {/* Listings */}
          <Box component="main" sx={{ flexGrow: 1 }}>
            <InfiniteScroll
              {...({
                element: (props) => <Grid spacing={0} {...props} />,
                container: true,
                loader: (
                  <Grid item xs>
                    <CircularProgress />
                  </Grid>
                ),
                ...injectedInfiniteScrollProps,
              } as InfiniteScrollProps)}
            >
              {items?.map((item) => (
                <Grid key={item.id} item xs={12} md={4}>
                  {renderItem({ item })}
                </Grid>
              ))}
            </InfiniteScroll>

            {paginationProps && (
              <Box
                sx={{
                  py: 2,
                }}
                center
                {...({
                  component: Paper,
                  square: true,
                  elevation: 0,
                } as PaperProps)}
              >
                <Pagination
                  size="large"
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
  )
}

export default DirectoryWithFilter
