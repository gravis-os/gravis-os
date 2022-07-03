import React, { useEffect, useState } from 'react'
import { AppBar, Toolbar, useMediaQuery, useTheme } from '@mui/material'
import { Box, IconButton, List } from '@gravis-os/ui'

import MenuIcon from '@mui/icons-material/Menu'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import dashboardLayoutConfig from './dashboardLayoutConfig'
import ResponsiveDrawer from './ResponsiveDrawer'

const { leftAsideWidth, rightAsideWidth, miniVariantWidth, headerHeight } =
  dashboardLayoutConfig

export interface DashboardLayoutProps {
  // Logo
  logo: React.ReactNode

  // Default states
  defaultLeftAsideOpen?: boolean
  defaultLeftSecondaryAsideOpen?: boolean
  defaultRightSecondaryAsideOpen?: boolean

  // Disables
  disablePadding?: boolean

  // Minivariant
  isMiniVariant?: boolean

  children?: React.ReactNode
}

const DashboardLayout: React.FC<DashboardLayoutProps> = (props) => {
  const {
    loading,
    leftSecondaryAsideLoading,
    logoTitle,
    logo,
    logoAvatarProps,
    logoLinkComponent: LogoLinkComponent = 'a',
    logoLinkProps = { href: '/' },
    userAvatarProps,
    headerProps,
    leftSecondaryAside,
    onSearch,
    title,
    breadcrumbs,
    children,
    rightAside,
    rightAsideProps,
    leftAsideMenu,
    appVersion,
    footer,
    callout,
    defaultLeftAsideOpen = true,
    defaultRightAsideOpen = true,
    defaultLeftSecondaryAsideOpen = false,
    defaultRightSecondaryAsideOpen = true,
    gutterBottom,
    disablePadding,
    disablePaddingTop,
    drawer,
    drawerProps,
    isDrawerVisible,
    onDrawerClose,
    disableLeftAsideCollapse,
    disableRightAsideCollapse,
    onLeftAsideCollapse,
    onLeftSecondaryAsideCollapse,
    mobileHeaderMenuItems,
    mobileHeaderDrawerProps,
    isMiniVariant,
    leftAsideListItems,
    rightAsideListItems,
  } = props

  // States
  const [leftAsideOpen, setLeftAsideOpen] =
    useState<boolean>(defaultLeftAsideOpen)
  const [rightAsideOpen, setRightAsideOpen] = useState<boolean>(
    defaultRightAsideOpen
  )
  const [leftSecondaryAsideOpen, setLeftSecondaryAsideOpen] = useState<boolean>(
    !defaultLeftSecondaryAsideOpen
  )
  const [rightSecondaryAsideOpen, setRightSecondaryAsideOpen] =
    useState<boolean>(!defaultRightSecondaryAsideOpen)
  const [mobileMenuDrawerVisible, setMobileMenuDrawerVisible] =
    useState<boolean>(false)

  // Effects
  // Collapse asides below desktop breakpoint
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  useEffect(() => {
    if (!isDesktop) {
      setLeftAsideOpen(false)
      setRightAsideOpen(false)
      setLeftSecondaryAsideOpen(false)
      setRightSecondaryAsideOpen(false)
    }
  }, [isDesktop])

  // Booleans
  const isLeftAsideOpen = disableLeftAsideCollapse || leftAsideOpen
  const isRightAsideOpen = disableRightAsideCollapse || rightAsideOpen
  const hasMobileHeader = mobileHeaderMenuItems && !isDesktop
  const hasMobileHeaderLogoAvatarMobileSrc = Boolean(
    hasMobileHeader && logoAvatarProps.mobileSrc
  )

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Header */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          {/* Left Menu Icon */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setLeftAsideOpen(!leftAsideOpen)}
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Box sx={{ flexGrow: 1 }}>{logo}</Box>

          {/* Right Menu Icon */}
          <IconButton
            color="inherit"
            edge="end"
            onClick={() => setRightAsideOpen(!rightAsideOpen)}
          >
            <InfoOutlinedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Body */}
      <Box
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          maxWidth: '100%',
          marginTop: `${headerHeight + (disablePadding ? 0 : 24)}px`,
          // Drawer effects
          ...(isLeftAsideOpen && { ml: { md: `${leftAsideWidth}px` } }),
          ...(isMiniVariant &&
            !isLeftAsideOpen && { ml: `${miniVariantWidth}px` }),
          ...(isRightAsideOpen && { mr: { md: `${rightAsideWidth}px` } }),
          transition: theme.transitions.create(['margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        {/* Left Aside */}
        <Box component="nav">
          <ResponsiveDrawer
            width={
              isMiniVariant
                ? isLeftAsideOpen
                  ? leftAsideWidth
                  : miniVariantWidth
                : leftAsideWidth
            }
            sx={{
              ...(isMiniVariant && {
                transition: theme.transitions.create(['width'], {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.leavingScreen,
                }),
              }),
            }}
            open={isLeftAsideOpen}
            onClose={() => setLeftAsideOpen(false)}
            desktopDrawerProps={{
              variant: isMiniVariant ? 'permanent' : 'persistent',
            }}
          >
            <List
              disablePadding={isMiniVariant}
              items={leftAsideListItems.map((item) => ({
                ...item,
                disableGutters: true,
                textProps: {
                  ...(isMiniVariant &&
                    !leftAsideOpen && {
                      sx: {
                        opacity: 0,
                        transition: theme.transitions.create(['opacity'], {
                          easing: theme.transitions.easing.sharp,
                          duration: theme.transitions.duration.leavingScreen,
                        }),
                      },
                    }),
                },
                buttonProps: {
                  sx: {
                    ...(isMiniVariant && { flexShrink: 0, px: 2.5 }),
                  },
                },
              }))}
            />
          </ResponsiveDrawer>
        </Box>

        {/* Main */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            ...(!disablePadding && { p: 3 }),
          }}
        >
          {children}
        </Box>

        {/* Right Aside */}
        <Box component="nav">
          <ResponsiveDrawer
            anchor="right"
            width={rightAsideWidth}
            open={isRightAsideOpen}
            onClose={() => setRightAsideOpen(false)}
          >
            <List
              dense
              items={rightAsideListItems.map((item) => ({
                ...item,
                disableGutters: true,
              }))}
            />
          </ResponsiveDrawer>
        </Box>
      </Box>
    </Box>
  )
}

export default DashboardLayout
