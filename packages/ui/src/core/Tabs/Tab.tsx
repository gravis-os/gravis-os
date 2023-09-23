import React from 'react'

import { Tab as MuiTab, TabProps as MuiTabProps } from '@mui/material'

export interface TabProps extends Omit<MuiTabProps, 'children' | 'hidden'> {
  children?: React.ReactNode
  hidden?: ((item) => void) | boolean
}

const Tab: React.FC<TabProps> = (props) => {
  const { children, hidden, ...rest } = props

  // Hidden
  if (typeof hidden === 'function' || typeof hidden === 'boolean') {
    const shouldHide = typeof hidden === 'function' ? hidden(props) : hidden
    if (shouldHide) return null
  }

  return <MuiTab {...rest} />
}

export default Tab
