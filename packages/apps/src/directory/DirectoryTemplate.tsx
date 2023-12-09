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
    gridItemProps: injectedGridItemProps,
    gridProps: injectedGridProps,
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
  const [lng, setLng] = useState(103.809_676_230_792_66)
  const [lat, setLat] = useState(1.353_937_636_282_964_3)
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

  useEffect(() => {
    if (enableMap && showMap) setVariant(PaginatedQueryViewVariantEnum.List)
  }, [enableMap, showMap])

  const getGridItemProps = (variant: PaginatedQueryViewVariantEnum) => {
    switch (variant) {
      case PaginatedQueryViewVariantEnum.Grid: {
        return injectedGridItemProps
      }
      case PaginatedQueryViewVariantEnum.List: {
        return { ...injectedGridItemProps, md: 12, lg: 12, xl: 12 }
      }
      default: {
        return
      }
    }
  }

  const getGridProps = (variant: PaginatedQueryViewVariantEnum) => {
    switch (variant) {
      case PaginatedQueryViewVariantEnum.Grid: {
        return injectedGridProps
      }
      case PaginatedQueryViewVariantEnum.List: {
        return { ...injectedGridProps, padding: 2, spacing: 4 }
      }
      default: {
        return
      }
    }
  }

  const gridItemProps = getGridItemProps(variant)
  const gridProps = getGridProps(variant)

  // State: Bottom drawer
  const nextItemProps = {
    ...itemProps,
    ...(enableMap && {
      itemOnClick: (item) => {
        setLng(item.lng)
        setLat(item.lat)
      },
      size: 'small',
    }),
  }
  const directoryListingsJsx = (
    <PaginatedListings
      gridItemProps={gridItemProps}
      gridProps={gridProps}
      itemProps={nextItemProps}
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
        disableGridOption={enableMap && showMap}
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
                mapProps={{ lat, lng, setLat, setLng }}
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
