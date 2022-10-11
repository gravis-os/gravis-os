import React from 'react'
import { Box, Typography } from '@gravis-os/ui'
import { SwipeableDrawer, Fab } from '@mui/material'
import KeyboardDoubleArrowUpOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowUpOutlined'
import MapOutlinedIcon from '@mui/icons-material/MapOutlined'
import { BOTTOM_DRAWER_EXPANDED_HEIGHT } from './constants'

export interface BottomDrawerProps {
  title?: React.ReactNode
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  drawerBleeding?: number
  children?: React.ReactNode
}

const BottomDrawer: React.FC<BottomDrawerProps> = (props) => {
  const { title, open, setOpen, drawerBleeding = 56, children } = props

  const FabIcon = open ? MapOutlinedIcon : KeyboardDoubleArrowUpOutlinedIcon

  return (
    <>
      <Box
        sx={{
          width: '100%',
          position: 'fixed',
          zIndex: 'modal',
          bottom: '16px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      >
        <Fab
          variant="extended"
          onClick={() => setOpen(!open)}
          size={open ? 'medium' : 'small'}
        >
          <FabIcon fontSize="small" sx={{ mr: open ? 0.5 : 0 }} />
          {open ? 'Map' : ''}
        </Fab>
      </Box>

      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{ keepMounted: true }}
        sx={{
          '&.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(${BOTTOM_DRAWER_EXPANDED_HEIGHT} - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
            backgroundColor: 'background.paper',
          }}
        >
          {/* Puller */}
          <Box
            sx={{
              width: 30,
              height: 6,
              borderRadius: 3,
              position: 'absolute',
              top: 8,
              left: 'calc(50% - 15px)',
              backgroundColor: 'background.muted',
            }}
          />

          {/* Preview portion */}
          {title &&
            (typeof title === 'string' ? (
              <Typography sx={{ p: 2, color: 'text.secondary' }}>
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
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'auto',
          }}
        >
          {children}
        </Box>
      </SwipeableDrawer>
    </>
  )
}

export default BottomDrawer
