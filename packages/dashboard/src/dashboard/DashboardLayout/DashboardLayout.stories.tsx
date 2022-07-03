import React from 'react'
import DashboardLayout from './DashboardLayout'

export default {
  component: DashboardLayout,
  parameters: { layout: 'fullscreen' },
  args: {
    logo: 'My App',
    children: 'Hello World',
    disablePadding: true,
  },
}

export const Basic = ({ ...rest }) => <DashboardLayout {...rest} />

export const Minivariant = ({ ...rest }) => <DashboardLayout {...rest} />
Minivariant.args = { isMiniVariant: true }
