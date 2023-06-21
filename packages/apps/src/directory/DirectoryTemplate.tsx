import React, { useEffect, useState } from 'react'
import { Box, Container } from '@gravis-os/ui'
import { useMediaQuery, useTheme } from '@mui/material'
import {
  PaginatedQueryViewVariantEnum,
  PaginatedQueryViewPaginationTypeEnum,
  PAGINATED_QUERY_VIEW_GRID_ITEM_MIN_WIDTH,
  UseFilterDefsReturn,
  UseSortDefsReturn,
} from '@gravis-os/query'
import FilterAppBar from './FilterAppBar'
import DirectoryDrawer from './DirectoryDrawer'
import FilterAccordions from './FilterAccordions'
import PaginatedListings, { PaginatedListingsProps } from './PaginatedListings'
import BottomDrawer from './BottomDrawer'
import MapDrawer from './MapDrawer'

export interface DirectoryTemplateProps extends PaginatedListingsProps {
  title?: string
  enableMap?: boolean
  filterDrawerWidth?: number
  useFilterDefsProps?: UseFilterDefsReturn
  useSortDefsProps?: UseSortDefsReturn
}

/**
 * Base Directory Template with Listings, Pagination, Filter, Sort, Search, Compare
 * @param props
 * @constructor
 */
const DirectoryTemplate: React.FC<DirectoryTemplateProps> = (props) => {
  const {
    title,
    enableMap,
    items,
    variant: injectedVariant = PaginatedQueryViewVariantEnum.Grid,
    itemProps,
    pagination,
    paginationType = PaginatedQueryViewPaginationTypeEnum.Pagination,
    useFilterDefsProps,
    useSortDefsProps,
    gridProps,
    gridItemProps,
    filterDrawerWidth = 240,
    queryResult,
  } = props

  const itemsCount = pagination?.count || items?.length

  // Effect: Hide drawer on mobile, switch to overlay drawer
  const { setFilterDrawerOpen, isFilterDrawerOpen } = useFilterDefsProps
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true })
  useEffect(() => {
    if (isDesktop && !isFilterDrawerOpen) setFilterDrawerOpen(true)
    if (!isDesktop && isFilterDrawerOpen) setFilterDrawerOpen(false)
  }, [isDesktop])

  // State: Variant
  const [variant, setVariant] = useState(injectedVariant)
  useEffect(() => {
    if (variant !== injectedVariant) setVariant(injectedVariant)
  }, [injectedVariant])

  // State: Map
  const [showMap, setShowMap] = useState(true)
  const [expandMap, setExpandMap] = useState(false)

  // State: Bottom drawer
  const directoryListingsJsx = (
    <PaginatedListings
      gridProps={gridProps}
      gridItemProps={gridItemProps}
      items={items}
      itemProps={itemProps}
      paginationType={paginationType}
      pagination={pagination}
      queryResult={queryResult}
      variant={variant}
    />
  )

  const [showBottomDrawer, setShowBottomDrawer] = useState(true)

  const renderPaginatedListings = () => {
    switch (true) {
      case enableMap:
        return (
          <>
            {isDesktop ? (
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  minWidth: PAGINATED_QUERY_VIEW_GRID_ITEM_MIN_WIDTH,
                  // Mobile view for map
                  position: { xs: 'absolute', md: 'static' },
                  height: { xs: '100%', md: 'inherit' },
                  zIndex: { xs: 1, md: 'initial' },
                }}
              >
                {directoryListingsJsx}
              </Box>
            ) : (
              <BottomDrawer
                title={`${itemsCount} Results`}
                open={showBottomDrawer}
                setOpen={setShowBottomDrawer}
              >
                {directoryListingsJsx}
              </BottomDrawer>
            )}
          </>
        )
      default:
        return (
          <Box component="main" sx={{ flexGrow: 1 }}>
            {directoryListingsJsx}
          </Box>
        )
    }
  }

  return (
    <>
      <FilterAppBar
        title={title}
        subtitle={`(${itemsCount} results)`}
        useFilterDefsProps={useFilterDefsProps}
        useSortDefsProps={useSortDefsProps}
        directoryVariant={variant}
        setDirectoryVariant={setVariant}
        {...(enableMap && { showMap, setShowMap })}
      />

      <Box>
        <Container maxWidth={false} disableGutters>
          {/* Directory */}
          <Box
            sx={{
              display: 'flex',
              position: 'relative',
              minHeight: { xs: '100vh', md: 'initial' },
            }}
          >
            {/* Filter Drawer */}
            <DirectoryDrawer
              open={isFilterDrawerOpen}
              setOpen={setFilterDrawerOpen}
              width={filterDrawerWidth}
            >
              <FilterAccordions useFilterDefsProps={useFilterDefsProps} />
            </DirectoryDrawer>

            {/* Listings */}
            {renderPaginatedListings()}

            {/* Map Drawer */}
            {enableMap && (
              <MapDrawer
                useFilterDefsProps={useFilterDefsProps}
                width={filterDrawerWidth}
                showMap={showMap}
                setShowMap={setShowMap}
                expandMap={expandMap}
                setExpandMap={setExpandMap}
                items={items}
              />
            )}
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default DirectoryTemplate
