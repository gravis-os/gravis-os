import React from 'react'
import {
  Card,
  List,
  Grid,
  Typography,
  TabContent,
  Tabs,
  useTabs,
  MOCK_DASHBOARD_HEADER_PROPS,
  IconButton,
} from '@gravis-os/ui'
import MenuIcon from '@mui/icons-material/Menu'
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { MOCK_TABS, MOCK_LOGO_JSX, MOCK_LIST_ITEMS } from '../../mocks'
import DashboardLayout from './DashboardLayout'

const DashboardLayoutChildren = (props) => {
  const tabs = useTabs({ tabs: MOCK_TABS })
  return (
    <>
      {/* Tabs */}
      <Tabs disableGutterBottom {...tabs} />
      <TabContent {...tabs} />
    </>
  )
}

export default {
  component: DashboardLayout,
  parameters: { layout: 'fullscreen' },
  args: {
    logo: MOCK_LOGO_JSX,
    disablePadding: true,
    leftAsideListItems: MOCK_LIST_ITEMS,
    children: <DashboardLayoutChildren />,
    rightAsideListItems: MOCK_LIST_ITEMS,
    headerProps: {
      ...MOCK_DASHBOARD_HEADER_PROPS,
      navItems: {
        ...MOCK_DASHBOARD_HEADER_PROPS.navItems,
        left: [
          {
            key: 'left-aside-menu-toggle',
            render: (props) => {
              const { setLeftAsideOpen, leftAsideOpen, isLeftAsideOpen } = props
              return (
                <IconButton
                  color="inherit"
                  edge="start"
                  onClick={() => setLeftAsideOpen(!leftAsideOpen)}
                  sx={{ mr: 1 }}
                >
                  {isLeftAsideOpen ? <MenuOpenOutlinedIcon /> : <MenuIcon />}
                </IconButton>
              )
            },
          },
          ...MOCK_DASHBOARD_HEADER_PROPS.navItems.left,
        ],
      },
    },
  },
}

export const Basic = (props) => <DashboardLayout {...props} />

export const Minivariant = (props) => <DashboardLayout {...props} />
Minivariant.args = { isMiniVariant: true }

export const MinivariantWithNestedList = (props) => (
  <DashboardLayout {...props} />
)
MinivariantWithNestedList.args = {
  ...Minivariant.args,
  leftAsideListItems: [
    {
      ...MOCK_LIST_ITEMS[0],
      key: 'nested-quotations',
      title: 'All Quotations',
      defaultOpen: false,
      items: [MOCK_LIST_ITEMS[1], MOCK_LIST_ITEMS[2]],
    },
    ...MOCK_LIST_ITEMS,
  ],
}

export const DarkMinivariantWithNestedList = (props) => (
  <DashboardLayout {...props} />
)
DarkMinivariantWithNestedList.args = {
  ...MinivariantWithNestedList.args,
  darkLeftAside: true,
}

export const MinivariantWithDisableClipUnderAppBar = (props) => (
  <DashboardLayout {...props} />
)
MinivariantWithDisableClipUnderAppBar.args = {
  ...MinivariantWithNestedList.args,
  disableClipUnderAppBar: true,
}

export const MinivariantWithDisableClipUnderAppBarAndGrid = (props) => (
  <DashboardLayout {...props} />
)
MinivariantWithDisableClipUnderAppBarAndGrid.args = {
  ...MinivariantWithNestedList.args,
  defaultLeftAsideOpen: false,
  defaultRightAsideOpen: false,
  disableClipUnderAppBar: true,
  children: (
    <>
      <Grid container spacing={0}>
        <Grid item sm={3}>
          <Card square sx={{ minHeight: { md: '100vh' }, height: '100%' }}>
            <Typography variant="h5">Welcome back!</Typography>
            <List items={MOCK_LIST_ITEMS} />
          </Card>
        </Grid>
        <Grid item sm={9}>
          <DashboardLayoutChildren />
        </Grid>
      </Grid>
    </>
  ),
}

export const DarkMinivariantWithDisableClipUnderAppBarAndGrid = (props) => (
  <DashboardLayout {...props} />
)
DarkMinivariantWithDisableClipUnderAppBarAndGrid.args = {
  ...MinivariantWithDisableClipUnderAppBarAndGrid.args,
  darkLeftAside: true,
  leftAsideListItemProps: {
    iconProps: {
      sx: { color: 'text.secondary' },
    },
  },
}
