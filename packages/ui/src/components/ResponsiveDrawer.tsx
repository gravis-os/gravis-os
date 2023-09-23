import type { SvgIconProps, Theme } from '@mui/material'

import React from 'react'

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { ThemeProvider } from '@mui/material/styles'

import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Drawer,
  DrawerProps,
} from '../core'

export interface ResponsiveDrawerProps extends DrawerProps {
  dark?: boolean
  desktopDrawerProps?: DrawerProps
  disableBorder?: boolean
  maxWidth?: number | string
  mobileDrawerProps?: DrawerProps
  onOpen?: () => void

  // Toggle Bar
  // TODO@Fernando: Move to separate component
  showToggleBar?: boolean
  // Toggle Button
  showToggleButton?: boolean
  toggleBarBoxProps?: BoxProps
  toggleBarButtonProps?: ButtonProps

  toggleButtonProps?: ButtonProps
  toggleSvgIconProps?: SvgIconProps

  width?: number | string
}

const ResponsiveDrawer: React.FC<ResponsiveDrawerProps> = (props) => {
  const {
    anchor = 'left',
    children,
    dark,
    desktopDrawerProps,
    disableBorder,
    maxWidth = '100%',
    mobileDrawerProps,
    onClose,
    onOpen,
    open,
    // Toggle bar is a white full height bar
    showToggleBar,
    // Exit button
    showToggleButton,

    sx,
    toggleBarBoxProps,
    toggleBarButtonProps,
    toggleButtonProps,

    toggleSvgIconProps,
    width,
  } = props

  const childrenJSX = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
      }}
    >
      {children}

      {/* Toggle Button */}
      {open && showToggleButton && (
        <Button
          fullWidth
          onClick={(e) => onClose(e, 'backdropClick')}
          {...toggleButtonProps}
        >
          {toggleButtonProps?.children || <ChevronLeftIcon />}
        </Button>
      )}
    </Box>
  )

  const commonDrawerProps = {
    anchor,
    children: childrenJSX,
    open,
    sx: {
      '& .MuiDrawer-paper': {
        boxSizing: 'border-box',
        maxWidth,
        width,
        ...(disableBorder && { border: 0 }),
        ...sx,
      },
    } as DrawerProps['sx'],
  }

  const handleToggleDrawer = (e) => {
    if (open) {
      if (onClose) onClose(e, 'backdropClick')
    } else if (onOpen) onOpen()
  }

  const drawerJsx = (
    <Box component="nav">
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        {...commonDrawerProps}
        // Better open performance on mobile.
        ModalProps={{ disableScrollLock: true, keepMounted: true }}
        onClose={onClose}
        sx={{
          display: { xs: 'block', sm: 'none' },
          ...commonDrawerProps?.sx,
        }}
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

      {/* Toggle Bar */}
      {showToggleBar && (
        <Box
          height="100%"
          left={open ? (maxWidth in props ? maxWidth : width) : 0}
          position="fixed"
          top={0}
          {...toggleBarBoxProps}
          onClick={handleToggleDrawer}
          sx={{
            transition: (theme) =>
              theme.transitions.create(['left'], {
                duration: theme.transitions.duration.leavingScreen,
                easing: theme.transitions.easing.sharp,
              }),
            zIndex: (theme) => theme.zIndex.drawer + 1,
            ...toggleBarBoxProps?.sx,
          }}
        >
          <Button
            color="primary"
            sx={{
              borderRadius: 0,
              height: '100%',
              minWidth: open ? 0 : 20,
              opacity: 0.08,
              p: 0,
            }}
            variant="contained"
          />
          <Button
            color="primary"
            disableElevation
            variant="contained"
            {...toggleBarButtonProps}
            onClick={handleToggleDrawer}
            sx={{
              borderRadius: '50%',
              minWidth: 'auto',
              p: 0,
              position: 'absolute',
              right: -10,
              top: 150,
              transform: `rotate(${open ? 180 : 0}deg)`,
              transition: `transform .275s ease-in`,
              ...toggleBarButtonProps?.sx,
            }}
          >
            <ChevronRightIcon fontSize="medium" {...toggleSvgIconProps} />
          </Button>
        </Box>
      )}
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
