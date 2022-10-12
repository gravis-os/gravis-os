import React, { useEffect, useMemo, useState } from 'react'
import { Box, Container } from '@gravis-os/ui'
import { useMediaQuery, useTheme } from '@mui/material'
import { UseFilterDefsReturn } from './useFilterDefs'
import { UseSortDefsReturn } from './useSortDefs'
import FilterAppBar from './FilterAppBar'
import DirectoryDrawer from './DirectoryDrawer'
import FilterAccordions from './FilterAccordions'
import DirectoryListings, { DirectoryListingsProps } from './DirectoryListings'
import { DirectoryVariantEnum, DirectoryPaginationTypeEnum } from './types'
import BottomDrawer from './BottomDrawer'
import MapDrawer from './MapDrawer'
import { DIRECTORY_LISTING_GRID_ITEM_MIN_WIDTH } from './constants'

export interface DirectoryTemplateProps extends DirectoryListingsProps {
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
    variant: injectedVariant = DirectoryVariantEnum.Grid,
    renderItem,
    itemProps,
    pagination,
    paginationType = DirectoryPaginationTypeEnum.Pagination,
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
    <DirectoryListings
      gridProps={gridProps}
      gridItemProps={gridItemProps}
      items={items}
      itemProps={itemProps}
      paginationType={paginationType}
      pagination={pagination}
      queryResult={queryResult}
      renderItem={renderItem}
      variant={variant}
    />
  )

  const [showBottomDrawer, setShowBottomDrawer] = useState(true)

  const renderDirectoryListings = () => {
    switch (true) {
      case enableMap:
        return (
          <>
            {isDesktop ? (
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  minWidth: DIRECTORY_LISTING_GRID_ITEM_MIN_WIDTH,
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
            {renderDirectoryListings()}

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
