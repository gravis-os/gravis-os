import React, { useEffect, useState } from 'react'
import { AppBar, Toolbar, useMediaQuery, useTheme } from '@mui/material'
import {
  Box,
  IconButton,
  List,
  ListItemProps,
  Header,
  HeaderProps,
  MOCK_DASHBOARD_HEADER_PROPS,
} from '@gravis-os/ui'
import MenuIcon from '@mui/icons-material/Menu'
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined'
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
  defaultRightAsideOpen?: boolean
  defaultLeftSecondaryAsideOpen?: boolean
  defaultRightSecondaryAsideOpen?: boolean

  // Disables
  disablePadding?: boolean

  // Minivariant
  isMiniVariant?: boolean
  disableClipUnderAppBar?: boolean

  // Dark mode
  darkLeftAside?: boolean

  // Aside Props
  leftAsideListItems?: ListItemProps['items']
  rightAsideListItems?: ListItemProps['items']
  leftAsideListItemProps?: ListItemProps

  // Disables
  disableLeftAsideCollapse?: boolean
  disableRightAsideCollapse?: boolean

  headerProps?: HeaderProps

  children?: React.ReactNode
}

const DashboardLayout: React.FC<DashboardLayoutProps> = (props) => {
  const {
    logo,
    children,
    defaultLeftAsideOpen = true,
    defaultRightAsideOpen = true,
    defaultLeftSecondaryAsideOpen = false,
    defaultRightSecondaryAsideOpen = true,
    disablePadding,
    disableLeftAsideCollapse,
    disableRightAsideCollapse,

    // loading,
    // leftSecondaryAsideLoading,
    // logoTitle,
    // logoLinkProps = { href: '/' },
    // userAvatarProps,
    // headerProps,
    // leftSecondaryAside,
    // onSearch,
    // title,
    // breadcrumbs,
    // rightAside,
    // rightAsideProps,
    // leftAsideMenu,
    // appVersion,
    // footer,
    // callout,
    // gutterBottom,
    // disablePaddingTop,
    // drawer,
    // drawerProps,
    // isDrawerVisible,
    // onDrawerClose,
    // onLeftAsideCollapse,
    // onLeftSecondaryAsideCollapse,
    // mobileHeaderDrawerProps,
    // mobileHeaderMenuItems,

    isMiniVariant,
    leftAsideListItems,
    rightAsideListItems,
    disableClipUnderAppBar,
    darkLeftAside,
    leftAsideListItemProps,
    headerProps,
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

  const layoutProps = {
    leftAsideOpen,
    setLeftAsideOpen,
    isLeftAsideOpen,
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Header
        position="fixed"
        {...headerProps}
        sx={{
          ...(disableClipUnderAppBar && {
            left: leftAsideOpen ? leftAsideWidth : miniVariantWidth,
            width: leftAsideOpen
              ? `calc(100% - ${leftAsideWidth}px)`
              : `calc(100% - ${miniVariantWidth}px)`,
            transition: theme.transitions.create(['left', 'width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }),
          ...headerProps?.sx,
        }}
        renderProps={layoutProps}
      />

      {/* Body */}
      <Box
        sx={{
          zIndex: (theme) => theme.zIndex.appBar - 1,
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
        <ResponsiveDrawer
          dark={darkLeftAside}
          width={
            // eslint-disable-next-line no-nested-ternary
            isMiniVariant
              ? isLeftAsideOpen
                ? leftAsideWidth
                : miniVariantWidth
              : leftAsideWidth
          }
          sx={{
            overflowX: 'hidden',
            marginTop: disableClipUnderAppBar ? 0 : `${headerHeight}px`,
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
            items={leftAsideListItems.map((item) => ({
              ...item,
              disableGutters: true,
              hasTooltip: isMiniVariant && !leftAsideOpen,
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
                ...(isMiniVariant &&
                  !leftAsideOpen && {
                    onClick: () => setLeftAsideOpen(true),
                  }),
              },
              collapseProps: {
                sx: {
                  ...(isMiniVariant &&
                    !isLeftAsideOpen && {
                      display: 'none',
                    }),
                },
              },
              ...leftAsideListItemProps,
            }))}
          />
        </ResponsiveDrawer>

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
        <ResponsiveDrawer
          anchor="right"
          width={rightAsideWidth}
          open={isRightAsideOpen}
          onClose={() => setRightAsideOpen(false)}
          sx={{ marginTop: `${headerHeight}px` }}
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
  )
}

export default DashboardLayout
