import React from 'react'
import DashboardLayout from './DashboardLayout'
import { MOCK_LOGO_JSX, MOCK_LIST_ITEMS } from '../../mocks'

export default {
  component: DashboardLayout,
  parameters: { layout: 'fullscreen' },
  args: {
    logo: MOCK_LOGO_JSX,
    children: 'Hello World',
    disablePadding: true,
    leftAsideListItems: MOCK_LIST_ITEMS,
    rightAsideListItems: MOCK_LIST_ITEMS,
  },
}

export const Basic = ({ ...rest }) => <DashboardLayout {...rest} />

export const Minivariant = ({ ...rest }) => <DashboardLayout {...rest} />
Minivariant.args = { isMiniVariant: true }

export const MinivariantWithNestedList = ({ ...rest }) => (
  <DashboardLayout {...rest} />
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
