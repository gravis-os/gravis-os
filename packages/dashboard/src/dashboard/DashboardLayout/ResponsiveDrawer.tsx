import React from 'react'
import { Drawer, DrawerProps } from '@mui/material'
import { Box } from '@gravis-os/ui'

export interface ResponsiveDrawerProps extends DrawerProps {
  width: number
  mobileDrawerProps?: DrawerProps
  desktopDrawerProps?: DrawerProps
}

const ResponsiveDrawer: React.FC<ResponsiveDrawerProps> = (props) => {
  const {
    mobileDrawerProps,
    desktopDrawerProps,
    anchor = 'left',
    children,
    width,
    open,
    onClose,
    sx,
  } = props

  const commonDrawerProps = {
    anchor,
    children,
    open,
    sx: {
      '& .MuiDrawer-paper': {
        width,
        boxSizing: 'border-box',
        ...sx,
      },
    } as DrawerProps['sx'],
  }

  return (
    <Box component="nav">
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        {...commonDrawerProps}
        sx={{
          display: { xs: 'block', sm: 'none' },
          ...commonDrawerProps?.sx,
        }}
        onClose={onClose}
        // Better open performance on mobile.
        ModalProps={{ keepMounted: true }}
        {...mobileDrawerProps}
      />

      {/* Desktop Drawer */}
      <Drawer
        variant="persistent"
        {...commonDrawerProps}
        sx={{
          display: { xs: 'none', sm: 'block' },
          ...commonDrawerProps?.sx,
        }}
        {...commonDrawerProps}
        {...desktopDrawerProps}
      />
    </Box>
  )
}

export default ResponsiveDrawer
