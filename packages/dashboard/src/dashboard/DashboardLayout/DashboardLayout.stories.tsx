import React from 'react'
import DashboardLayout from './DashboardLayout'

export default {
  component: DashboardLayout,
  args: {
    logo: 'My App',
    children: 'Hello World',
    disablePadding: true,
  },
}

export const Basic = ({ ...rest }) => <DashboardLayout {...rest} />
