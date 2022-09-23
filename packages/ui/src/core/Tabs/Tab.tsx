import React from 'react'
import { Tab as MuiTab, TabProps as MuiTabProps } from '@mui/material'

export interface TabProps extends MuiTabProps {}

const Tab: React.FC<TabProps> = (props) => {
  return <MuiTab {...props} />
}

export default Tab
