import React, { useEffect, useState } from 'react'
import { useTheme, useMediaQuery, Drawer, AppBar, Toolbar } from '@mui/material'
import {
  Box,
  Divider,
  IconButton,
  List,
  Typography,
  Stack,
  Tabs,
  TabContent,
  useTabs,
} from '@gravis-os/ui'

import MenuIcon from '@mui/icons-material/Menu'
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined'
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined'

const drawerWidth = 350

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

  const drawerJsx = (
    <div>
      <Toolbar />
      <Divider />
      <List
        dense
        items={[
          { key: 'quotations', title: '3 Quotations Pending' },
          { key: 'delivery-orders', title: '3 Delivery Orders Pending' },
          { key: 'sales-orders', title: '3 Sales Orders Pending' },
          { key: 'purchase-orders', title: '3 Purchase Orders Pending' },
        ].map((item) => ({
          ...item,
          disableGutters: true,
          startIcon: <ReceiptOutlinedIcon color="primary" />,
          endIcon: <ChevronRightOutlinedIcon color="primary" />,
          onClick: () => window.alert('You clicked me'),
          buttonProps: { sx: { px: 3 } },
        }))}
      />
      <Divider />
      <List
        dense
        items={[
          { key: 'quotations', title: '3 Quotations Pending' },
          { key: 'delivery-orders', title: '3 Delivery Orders Pending' },
          { key: 'sales-orders', title: '3 Sales Orders Pending' },
          { key: 'purchase-orders', title: '3 Purchase Orders Pending' },
        ].map((item) => ({
          ...item,
          disableGutters: true,
          startIcon: <ReceiptOutlinedIcon color="primary" />,
          endIcon: <ChevronRightOutlinedIcon color="primary" />,
          onClick: () => window.alert('You clicked me'),
          buttonProps: { sx: { px: 3 } },
        }))}
      />
    </div>
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
          {/* Menu Icon */}
          {!isLeftAsideOpen && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={() => setLeftAsideOpen(!leftAsideOpen)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          {logo}
        </Toolbar>
      </AppBar>

      {/* Left Aside */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={isLeftAsideOpen}
          onClose={() => setLeftAsideOpen(false)}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawerJsx}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawerJsx}
        </Drawer>
      </Box>

      {/* Main */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ...(!disablePadding && { p: 3 }),
        }}
      >
        <Toolbar />

        {/* Tabs */}
        <Tabs disableGutterBottom {...tabs} />
        <TabContent {...tabs} />

        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Box>

      {/* Right Aside */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          anchor="right"
          variant="temporary"
          open={isRightAsideOpen}
          onClose={() => setRightAsideOpen(false)}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawerJsx}
        </Drawer>
        <Drawer
          anchor="right"
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawerJsx}
        </Drawer>
      </Box>
    </Box>
  )
}

export default DashboardLayout
