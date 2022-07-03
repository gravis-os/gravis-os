import React, { useEffect, useState } from 'react'
import { useTheme, useMediaQuery, AppBar, Toolbar } from '@mui/material'
import {
  Box,
  IconButton,
  List,
  Typography,
  Stack,
  Tabs,
  TabContent,
  useTabs,
} from '@gravis-os/ui'

import MenuIcon from '@mui/icons-material/Menu'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import dashboardLayoutConfig from './dashboardLayoutConfig'
import ResponsiveDrawer from './ResponsiveDrawer'

const { leftAsideWidth, rightAsideWidth, miniVariantWidth, headerHeight } =
  dashboardLayoutConfig

const MOCK_TABS = [
  {
    key: 'finance',
    value: 'finance',
    label: 'Finance',
    children: (
      <Box p={3}>
        <Stack spacing={2}>
          {/* Header */}
          <Box>
            <Typography variant="h4">Overview</Typography>
            <Typography variant="body1" color="text.secondary">
              View finance progress
            </Typography>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Rhoncus dolor purus non enim praesent elementum facilisis leo vel.
              Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
              gravida rutrum quisque non tellus. Convallis convallis tellus id
              interdum velit laoreet id donec ultrices. Odio morbi quis commodo
              odio aenean sed adipiscing. Amet nisl suscipit adipiscing bibendum
              est ultricies integer quis. Cursus euismod quis viverra nibh cras.
              Metus vulputate eu scelerisque felis imperdiet proin fermentum
              leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt
              lobortis feugiat vivamus at augue. At augue eget arcu dictum
              varius duis at consectetur lorem. Velit sed ullamcorper morbi
              tincidunt. Lorem donec massa sapien faucibus et molestie ac.
            </Typography>
            <Typography paragraph>
              Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
              ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
              elementum integer enim neque volutpat ac tincidunt. Ornare
              suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
              volutpat consequat mauris. Elementum eu facilisis sed odio morbi.
              Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt
              ornare massa eget egestas purus viverra accumsan in. In hendrerit
              gravida rutrum quisque non tellus orci ac. Pellentesque nec nam
              aliquam sem et tortor. Habitant morbi tristique senectus et.
              Adipiscing elit duis tristique sollicitudin nibh sit. Ornare
              aenean euismod elementum nisi quis eleifend. Commodo viverra
              maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin
              aliquam ultrices sagittis orci a.
            </Typography>
          </Box>
        </Stack>
      </Box>
    ),
  },
  {
    key: 'sales',
    value: 'sales',
    label: 'Sales',
    children: (
      <Box p={3}>
        <Stack spacing={2}>
          {/* Header */}
          <Box>
            <Typography variant="h4">Overview</Typography>
            <Typography variant="body1" color="text.secondary">
              View sales progress
            </Typography>
          </Box>
        </Stack>
      </Box>
    ),
  },
  {
    key: 'procurement',
    value: 'procurement',
    label: 'Procurement',
    children: (
      <Box p={3}>
        <Stack spacing={2}>
          {/* Header */}
          <Box>
            <Typography variant="h4">Overview</Typography>
            <Typography variant="body1" color="text.secondary">
              View procurement progress
            </Typography>
          </Box>
        </Stack>
      </Box>
    ),
  },
]

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

  const tabs = useTabs({ tabs: MOCK_TABS })

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
          {/* Tabs */}
          <Tabs disableGutterBottom {...tabs} />
          <TabContent {...tabs} />
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
