import React from 'react'
import { Drawer, DrawerProps, Theme } from '@mui/material'
import { Box } from '@gravis-os/ui'
import { ThemeProvider } from '@mui/material/styles'
import dashboardTheme from '../../themes/Dashboard/dashboardTheme'

export interface ResponsiveDrawerProps extends DrawerProps {
  width: number
  mobileDrawerProps?: DrawerProps
  desktopDrawerProps?: DrawerProps
  dark?: boolean
}

const ResponsiveDrawer: React.FC<ResponsiveDrawerProps> = (props) => {
  const {
    dark,
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

  const drawerJsx = (
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
        ModalProps={{ keepMounted: true, disableScrollLock: true }}
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

  return dark ? (
    <ThemeProvider
      theme={(outerTheme: Theme) => {
        const innerTheme = {
          ...outerTheme, // Outer theme would normally be the light theme
          palette: {
            /**
             * Set to dark mode with the default changes to dark mode palette
             * @link https://mui.com/material-ui/customization/dark-mode/#dark-mode-by-default
             * @note that mode: 'dark', does nothing because we're using a custom palette
             */
            mode: 'dark',
            ...dashboardTheme.dark.palette,
          },
        }

        return innerTheme
      }}
    >
      {drawerJsx}
    </ThemeProvider>
  ) : (
    drawerJsx
  )
}

export default ResponsiveDrawer
