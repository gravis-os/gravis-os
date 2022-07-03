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
