import React from 'react'
import { Tabs as MuiTabs, TabsProps as MuiTabsProps } from '@mui/material'

export interface TabsBaseProps extends MuiTabsProps {}

const TabsBase: React.FC<TabsBaseProps> = (props) => {
  return <MuiTabs {...props} />
}

export default TabsBase
