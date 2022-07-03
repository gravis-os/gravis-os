import React from 'react'
import { Drawer, DrawerProps } from '@mui/material'
import dashboardLayoutConfig from './dashboardLayoutConfig'

export interface ResponsiveDrawerProps extends DrawerProps {
  width: number
}

const ResponsiveDrawer: React.FC<ResponsiveDrawerProps> = (props) => {
  const { anchor = 'left', children, width, open, onClose } = props

  const commonDrawerProps = {
    anchor,
    children,
    open,
    sx: {
      '& .MuiDrawer-paper': {
        width,
        marginTop: `${dashboardLayoutConfig.headerHeight}px`,
        boxSizing: 'border-box',
      },
    },
  }

  return (
    <>
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
      />
    </>
  )
}

export default ResponsiveDrawer
