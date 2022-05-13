import React from 'react'
import { Tabs as MuiTabs, TabsProps as MuiTabsProps } from '@mui/material'

export interface TabsProps extends MuiTabsProps {}

const Tabs: React.FC<TabsProps> = props => {
  return <MuiTabs {...props} />
}

export default Tabs
