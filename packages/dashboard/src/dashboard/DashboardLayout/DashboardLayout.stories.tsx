import React from 'react'
import DashboardLayout from './DashboardLayout'

export default {
  component: DashboardLayout,
  parameters: { layout: 'fullscreen' },
  args: {
    logo: 'My App',
    children: 'Hello World',
    disablePadding: true,
    leftAsideListItems: [
      { key: 'quotations', title: '3 Quotations Pending' },
      { key: 'delivery-orders', title: '3 Delivery Orders Pending' },
      { key: 'sales-orders', title: '3 Sales Orders Pending' },
      { key: 'purchase-orders', title: '3 Purchase Orders Pending' },
    ],
    rightAsideListItems: [
      { key: 'quotations', title: '3 Quotations Pending' },
      { key: 'delivery-orders', title: '3 Delivery Orders Pending' },
      { key: 'sales-orders', title: '3 Sales Orders Pending' },
      { key: 'purchase-orders', title: '3 Purchase Orders Pending' },
    ],
  },
}

export const Basic = ({ ...rest }) => <DashboardLayout {...rest} />

export const Minivariant = ({ ...rest }) => <DashboardLayout {...rest} />
Minivariant.args = { isMiniVariant: true }
