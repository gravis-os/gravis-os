import React, { useMemo } from 'react'
import { Box, IconButton } from '@gravis-os/ui'
import dynamic from 'next/dynamic'
import KeyboardTabOutlinedIcon from '@mui/icons-material/KeyboardTabOutlined'
import DirectoryDrawer, { DirectoryDrawerProps } from './DirectoryDrawer'
import { UseFilterDefsReturn } from './useFilterDefs'
import type { MapProps } from './Map'
import { DirectoryListingsProps } from './DirectoryListings'

const Map = dynamic(() => import('./Map'), { ssr: false })

export interface MapDrawerProps {
  showMap: boolean
  setShowMap: React.Dispatch<React.SetStateAction<boolean>>
  expandMap: boolean
  setExpandMap: React.Dispatch<React.SetStateAction<boolean>>
  useFilterDefsProps: UseFilterDefsReturn
  width: DirectoryDrawerProps['width']
  mapProps?: MapProps
  items?: DirectoryListingsProps['items']
}

const MapDrawer: React.FC<MapDrawerProps> = (props) => {
  const {
    width,
    showMap,
    setShowMap,
    expandMap,
    setExpandMap,
    useFilterDefsProps,
    mapProps: injectedMapProps,
    items,
  } = props

  const { setFilterDrawerOpen } = useFilterDefsProps

  const mapProps = useMemo(() => {
    return {
      markers: items
        ?.map((item) => {
          if (!item) return

          const { id, title, subtitle, lat, lng } = item
          if (!lat && !lng) return

          return {
            id,
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [lng, lat] },
            properties: { title, subtitle },
          }
        })
        ?.filter(Boolean),
    }
  }, [items])

  return (
    <DirectoryDrawer
      width={Number(width) * (expandMap ? 5 : 3)}
      height="100vh"
      open={showMap}
      setOpen={setShowMap}
      variant="permanent"
      sx={{
        overflow: 'hidden',
        position: { xs: 'absolute', md: 'sticky' },
        height: { xs: '100%', md: '100vh' },
        zIndex: { xs: 0, md: 'initial' },
      }}
    >
      <Box sx={{ height: '100%', position: 'relative' }}>
        <Box
          sx={{
            p: 2,
            zIndex: 'appBar',
            position: 'absolute',
            top: 0,
            width: '100%',
          }}
        >
          <IconButton
            color="inherit"
            disableRipple
            sx={{
              mt: -2,
              ml: -2,
              borderRadius: 0,
              backgroundColor: 'background.paper',
              '&:hover': { backgroundColor: 'background.paper', opacity: 0.87 },
              display: { xs: 'none', md: 'block' },
            }}
            size="small"
            onClick={() => {
              if (!expandMap) setFilterDrawerOpen(false)
              setExpandMap(!expandMap)
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
