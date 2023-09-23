import React from 'react'

import { Box, Typography } from '@gravis-os/ui'
import KeyboardDoubleArrowUpOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowUpOutlined'
import MapOutlinedIcon from '@mui/icons-material/MapOutlined'
import { Fab, SwipeableDrawer } from '@mui/material'

import { BOTTOM_DRAWER_EXPANDED_HEIGHT } from './constants'

export interface BottomDrawerProps {
  children?: React.ReactNode
  drawerBleeding?: number
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title?: React.ReactNode
}

const BottomDrawer: React.FC<BottomDrawerProps> = (props) => {
  const { title, children, drawerBleeding = 56, open, setOpen } = props

  const FabIcon = open ? MapOutlinedIcon : KeyboardDoubleArrowUpOutlinedIcon

  return (
    <>
      <Box
        sx={{
          alignItems: 'flex-end',
          bottom: '16px',
          display: 'flex',
          justifyContent: 'center',
          position: 'fixed',
          width: '100%',
          zIndex: 'modal',
        }}
      >
        <Fab
          onClick={() => setOpen(!open)}
          size={open ? 'medium' : 'small'}
          variant="extended"
        >
          <FabIcon fontSize="small" sx={{ mr: open ? 0.5 : 0 }} />
          {open ? 'Map' : ''}
        </Fab>
      </Box>

      <SwipeableDrawer
        ModalProps={{ keepMounted: true }}
        anchor="bottom"
        disableSwipeToOpen={false}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        swipeAreaWidth={drawerBleeding}
        sx={{
          '&.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(${BOTTOM_DRAWER_EXPANDED_HEIGHT} - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      >
        <Box
          sx={{
            backgroundColor: 'background.paper',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            left: 0,
            position: 'absolute',
            right: 0,
            top: -drawerBleeding,
            visibility: 'visible',
          }}
        >
          {/* Puller */}
          <Box
            sx={{
              backgroundColor: 'background.muted',
              borderRadius: 3,
              height: 6,
              left: 'calc(50% - 15px)',
              position: 'absolute',
              top: 8,
              width: 30,
            }}
          />

          {/* Preview portion */}
          {title &&
            (typeof title === 'string' ? (
              <Typography sx={{ color: 'text.secondary', p: 2 }}>
                {title}
              </Typography>
            ) : (
              title
            ))}
        </Box>

        {/* Children */}
        <Box
          sx={{
            backgroundColor: 'background.paper',
            height: '100%',
            overflow: 'auto',
            pb: 2,
            px: 2,
          }}
        >
          {children}
        </Box>
      </SwipeableDrawer>
    </>
  )
}

export default BottomDrawer
