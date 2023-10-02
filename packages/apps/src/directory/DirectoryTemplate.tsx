import React, { useEffect, useState } from 'react'

import {
  PAGINATED_QUERY_VIEW_GRID_ITEM_MIN_WIDTH,
  PaginatedQueryViewPaginationTypeEnum,
  PaginatedQueryViewVariantEnum,
  UseFilterDefsReturn,
  UseSortDefsReturn,
} from '@gravis-os/query'
import { Box, Container } from '@gravis-os/ui'
import { useMediaQuery, useTheme } from '@mui/material'

import BottomDrawer from './BottomDrawer'
import DirectoryDrawer from './DirectoryDrawer'
import FilterAccordions from './FilterAccordions'
import FilterAppBar from './FilterAppBar'
import MapDrawer from './MapDrawer'
import PaginatedListings, { PaginatedListingsProps } from './PaginatedListings'

export interface DirectoryTemplateProps extends PaginatedListingsProps {
  enableMap?: boolean
  filterDrawerWidth?: number
  title?: string
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
    filterDrawerWidth = 240,
    gridItemProps,
    gridProps,
    itemProps,
    items,
    pagination,
    paginationType = PaginatedQueryViewPaginationTypeEnum.Pagination,
    queryResult,
    renderItem,
    useFilterDefsProps,
    useSortDefsProps,
    variant: injectedVariant = PaginatedQueryViewVariantEnum.Grid,
  } = props

  const itemsCount = pagination?.count || items?.length

  // Effect: Hide drawer on mobile, switch to overlay drawer
  const { isFilterDrawerOpen, setFilterDrawerOpen } = useFilterDefsProps
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

  const isListMode = variant === PaginatedQueryViewVariantEnum.List

  // State: Bottom drawer
  const directoryListingsJsx = (
    <PaginatedListings
      gridItemProps={
        isListMode
          ? { ...gridItemProps, md: 12, lg: 12, xl: 12 }
          : gridItemProps
      }
      gridProps={
        isListMode ? { ...gridProps, padding: 4, spacing: 4 } : gridProps
      }
      itemProps={itemProps}
      items={items}
      pagination={pagination}
      paginationType={paginationType}
      queryResult={queryResult}
      renderItem={renderItem}
      variant={variant}
    />
  )

  const [showBottomDrawer, setShowBottomDrawer] = useState(true)

  const renderPaginatedListings = () => {
    switch (true) {
      case enableMap: {
        return (
          <>
            {isDesktop ? (
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  height: { xs: '100%', md: 'inherit' },
                  minWidth: PAGINATED_QUERY_VIEW_GRID_ITEM_MIN_WIDTH,
                  // Mobile view for map
                  position: { xs: 'absolute', md: 'static' },
                  zIndex: { xs: 1, md: 'initial' },
                }}
              >
                {directoryListingsJsx}
              </Box>
            ) : (
              <BottomDrawer
                open={showBottomDrawer}
                setOpen={setShowBottomDrawer}
                title={`${itemsCount} Results`}
              >
                {directoryListingsJsx}
              </BottomDrawer>
            )}
          </>
        )
      }
      default: {
        return (
          <Box component="main" sx={{ flexGrow: 1 }}>
            {directoryListingsJsx}
          </Box>
        )
      }
    }
  }

  return (
    <>
      <FilterAppBar
        directoryVariant={variant}
        setDirectoryVariant={setVariant}
        subtitle={`(${itemsCount} results)`}
        title={title}
        useFilterDefsProps={useFilterDefsProps}
        useSortDefsProps={useSortDefsProps}
        {...(enableMap && { setShowMap, showMap })}
      />

      <Box>
        <Container disableGutters maxWidth={false}>
          {/* Directory */}
          <Box
            sx={{
              display: 'flex',
              minHeight: { xs: '100vh', md: 'initial' },
              position: 'relative',
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
                expandMap={expandMap}
                items={items}
                setExpandMap={setExpandMap}
                setShowMap={setShowMap}
                showMap={showMap}
                useFilterDefsProps={useFilterDefsProps}
                width={filterDrawerWidth}
              />
            )}
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default DirectoryTemplate
