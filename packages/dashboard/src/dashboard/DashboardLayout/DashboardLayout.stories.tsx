import React from 'react'

import {
  Card,
  Grid,
  List,
  MOCK_DASHBOARD_HEADER_PROPS,
  TabContent,
  Tabs,
  Typography,
  useTabs,
} from '@gravis-os/ui'

import { MOCK_LIST_ITEMS, MOCK_LOGO_JSX, MOCK_TABS } from '../../mocks'
import getStorybookTitle from '../../utils/getStorybookTitle'
import DashboardLayout from './DashboardLayout'

const DashboardLayoutChildren = () => {
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
  title: getStorybookTitle('DashboardLayout'),
  args: {
    children: <DashboardLayoutChildren />,
    disablePadding: true,
    headerProps: MOCK_DASHBOARD_HEADER_PROPS,
    leftAsideListItems: MOCK_LIST_ITEMS,
    logo: MOCK_LOGO_JSX,
    rightAsideListItems: MOCK_LIST_ITEMS,
  },
  component: DashboardLayout,
  parameters: { layout: 'fullscreen' },
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
      title: 'All Quotations',
      defaultOpen: false,
      items: [MOCK_LIST_ITEMS[1], MOCK_LIST_ITEMS[2]],
      key: 'nested-quotations',
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
  children: (
    <>
      <Grid container spacing={0}>
        <Grid item sm={3}>
          <Card square sx={{ height: '100%', minHeight: { md: '100vh' } }}>
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
  defaultLeftAsideOpen: false,
  defaultRightAsideOpen: false,
  disableClipUnderAppBar: true,
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

export const MinivariantWithSecondaryLeftAside = (props) => (
  <DashboardLayout {...props} />
)
MinivariantWithSecondaryLeftAside.args = {
  ...Minivariant.args,
  defaultLeftAsideOpen: false,
  defaultSecondaryLeftAsideOpen: false,
  disableHeaderMenuToggleOnMobile: true,
  headerProps: MOCK_DASHBOARD_HEADER_PROPS,
  leftAsideListItems: [
    {
      ...MOCK_LIST_ITEMS[0],
      title: 'All Quotations',
      defaultOpen: false,
      items: [MOCK_LIST_ITEMS[1], { ...MOCK_LIST_ITEMS[2], selected: true }],
      key: 'nested-quotations',
      selected: true,
    },
    ...MOCK_LIST_ITEMS.slice(0, 4),
  ],
  showSecondaryLeftAside: true,
}

export const MinivariantWithSecondaryLeftAsideWithDisableClipUnderAppBar = (
  props
) => <DashboardLayout {...props} />
MinivariantWithSecondaryLeftAsideWithDisableClipUnderAppBar.args = {
  ...MinivariantWithSecondaryLeftAside.args,
  disableClipUnderAppBar: true,
}
