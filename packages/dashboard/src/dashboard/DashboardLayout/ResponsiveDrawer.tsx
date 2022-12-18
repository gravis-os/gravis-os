import React from 'react'
import {
  Drawer,
  DrawerProps,
  Button,
  ButtonProps,
  SvgIconProps,
  Theme,
  BoxProps,
} from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { Box } from '@gravis-os/ui'
import { ThemeProvider } from '@mui/material/styles'
import dashboardTheme from '../../themes/Dashboard/dashboardTheme'
import dashboardLayoutConfig from './dashboardLayoutConfig'

const { secondaryMiniVariantWidth } = dashboardLayoutConfig

export interface ResponsiveDrawerProps extends DrawerProps {
  disableBorder?: boolean
  width: number
  mobileDrawerProps?: DrawerProps
  desktopDrawerProps?: DrawerProps
  dark?: boolean
  showToggleBar?: boolean
  showExitButton?: boolean
  toggleBarBoxProps?: BoxProps
  toggleButtonProps?: ButtonProps
  toggleSvgIconProps?: SvgIconProps
  exitButtonProps?: Omit<ButtonProps, 'onClick'>
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
    mobileDrawerProps,
    open,
    onOpen,
    onClose,
    sx,
    showToggleBar,
    showExitButton,
    exitButtonProps,
    toggleBarBoxProps,
    toggleButtonProps,
    toggleSvgIconProps,
  } = props

  const childrenJSX = (
    <>
      {children}
      {open && showExitButton && (
        <Box
          flex={1}
          display="flex"
          justifyContent="center"
          alignItems="flex-end"
          mb={8}
          px={3}
        >
          <Button
            variant="outlined"
            fullWidth
            {...exitButtonProps}
            onClick={(e) => onClose(e, 'backdropClick')}
          >
            {exitButtonProps?.children || <ChevronLeftIcon />}
          </Button>
        </Box>
      )}
    </>
  )

  const commonDrawerProps = {
    anchor,
    children: childrenJSX,
    open,
    sx: {
      '& .MuiDrawer-paper': {
        width,
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
      {showToggleBar && (
        <Box
          height="100%"
          position="fixed"
          top={0}
          left={open ? width : 0}
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
              minWidth: open ? 0 : secondaryMiniVariantWidth,
              borderRadius: 0,
              opacity: 0.08,
            }}
          />
          <Button
            variant="contained"
            color="primary"
            disableElevation
            {...toggleButtonProps}
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
              ...toggleButtonProps?.sx,
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
