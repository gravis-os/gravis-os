import React from 'react'
import DashboardLayout from './DashboardLayout'

export default {
  component: DashboardLayout,
  args: {
    children: 'Hello World',
  },
}

export const Basic = ({ ...rest }) => <DashboardLayout {...rest} />
