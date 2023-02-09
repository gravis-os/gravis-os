import React from 'react'
import type { SvgIconProps, Theme } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { ThemeProvider } from '@mui/material/styles'
import {
  Drawer,
  DrawerProps,
  Button,
  ButtonProps,
  Box,
  BoxProps,
} from '../core'

export interface ResponsiveDrawerProps extends DrawerProps {
  disableBorder?: boolean
  width?: number | string
  maxWidth?: number | string
  mobileDrawerProps?: DrawerProps
  desktopDrawerProps?: DrawerProps
  dark?: boolean

  // Toggle Bar
  // TODO@Fernando: Move to separate component
  showToggleBar?: boolean
  toggleBarBoxProps?: BoxProps
  toggleBarButtonProps?: ButtonProps
  toggleSvgIconProps?: SvgIconProps

  // Toggle Button
  showToggleButton?: boolean
  toggleButtonProps?: ButtonProps

  onOpen?: () => void
}

const ResponsiveDrawer: React.FC<ResponsiveDrawerProps> = (props) => {
  const {
    dark,
    disableBorder,
    desktopDrawerProps,
    anchor = 'left',
    children,
    width,
    maxWidth = '100%',
    mobileDrawerProps,
    open,
    onOpen,
    onClose,
    sx,

    // Toggle bar is a white full height bar
    showToggleBar,
    toggleBarBoxProps,
    toggleBarButtonProps,
    toggleSvgIconProps,

    // Exit button
    showToggleButton,
    toggleButtonProps,
  } = props

  const childrenJSX = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
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
        width,
        maxWidth,
        boxSizing: 'border-box',
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

      {/* Toggle Bar */}
      {showToggleBar && (
        <Box
          height="100%"
          position="fixed"
          top={0}
          left={open ? (maxWidth in props ? maxWidth : width) : 0}
          {...toggleBarBoxProps}
          onClick={handleToggleDrawer}
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            transition: (theme) =>
              theme.transitions.create(['left'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
            ...toggleBarBoxProps?.sx,
          }}
        >
          <Button
            color="primary"
            variant="contained"
            sx={{
              p: 0,
              height: '100%',
              minWidth: open ? 0 : 20,
              borderRadius: 0,
              opacity: 0.08,
            }}
          />
          <Button
            variant="contained"
            color="primary"
            disableElevation
            {...toggleBarButtonProps}
            onClick={handleToggleDrawer}
            sx={{
              position: 'absolute',
              top: 150,
              right: -10,
              p: 0,
              transform: `rotate(${open ? 180 : 0}deg)`,
              transition: `transform .275s ease-in`,
              borderRadius: '50%',
              minWidth: 'auto',
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
