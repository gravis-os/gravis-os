import React, { useMemo } from 'react'

import { UseFilterDefsReturn } from '@gravis-os/query'
import { Box, IconButton } from '@gravis-os/ui'
import KeyboardTabOutlinedIcon from '@mui/icons-material/KeyboardTabOutlined'
import dynamic from 'next/dynamic'

import type { MapProps } from './Map'

import DirectoryDrawer, { DirectoryDrawerProps } from './DirectoryDrawer'
import { PaginatedListingsProps } from './PaginatedListings'

const Map = dynamic(() => import('./Map'), { ssr: false })

export interface MapDrawerProps {
  expandMap: boolean
  items?: PaginatedListingsProps['items']
  mapProps?: MapProps
  setExpandMap: React.Dispatch<React.SetStateAction<boolean>>
  setShowMap: React.Dispatch<React.SetStateAction<boolean>>
  showMap: boolean
  useFilterDefsProps: UseFilterDefsReturn
  width: DirectoryDrawerProps['width']
}

const MapDrawer: React.FC<MapDrawerProps> = (props) => {
  const {
    expandMap,
    items,
    mapProps: injectedMapProps,
    setExpandMap,
    setShowMap,
    showMap,
    useFilterDefsProps,
    width,
  } = props

  const { setFilterDrawerOpen } = useFilterDefsProps

  const mapProps = useMemo(() => {
    return {
      markers: items
        ?.map((item) => {
          if (!item) return

          const { id, title, lat, lng, subtitle } = item
          if (!lat && !lng) return

          return {
            id,
            geometry: { coordinates: [lng, lat], type: 'Point' },
            properties: { title, subtitle },
            type: 'Feature',
          }
        })
        ?.filter(Boolean),
    }
  }, [items])

  return (
    <DirectoryDrawer
      height="100vh"
      open={showMap}
      setOpen={setShowMap}
      sx={{
        height: { xs: '100%', md: '100vh' },
        overflow: 'hidden',
        position: { xs: 'absolute', md: 'sticky' },
        zIndex: { xs: 0, md: 'initial' },
      }}
      variant="permanent"
      width={Number(width) * (expandMap ? 5 : 3)}
    >
      <Box sx={{ height: '100%', position: 'relative' }}>
        <Box
          sx={{
            p: 2,
            position: 'absolute',
            top: 0,
            width: '100%',
            zIndex: 'appBar',
          }}
        >
          <IconButton
            color="inherit"
            disableRipple
            onClick={() => {
              if (!expandMap) setFilterDrawerOpen(false)
              setExpandMap(!expandMap)
            }}
            size="small"
            sx={{
              '&:hover': { backgroundColor: 'background.paper', opacity: 0.87 },
              backgroundColor: 'background.paper',
              borderRadius: 0,
              display: { xs: 'none', md: 'block' },
              ml: -2,
              mt: -2,
            }}
          >
            <KeyboardTabOutlinedIcon
              fontSize="small"
              sx={{
                transform: `rotate3d(0, 0, 1, ${expandMap ? '0' : '180'}deg)`,
              }}
            />
          </IconButton>
        </Box>

        <Map shouldResize={expandMap} {...injectedMapProps} {...mapProps} />
      </Box>
    </DirectoryDrawer>
  )
}

export default MapDrawer
