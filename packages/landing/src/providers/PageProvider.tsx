import React from 'react'

import LayoutProvider, { LayoutProviderProps } from './LayoutProvider'
import SeoProvider from './SeoProvider'

export interface PageProviderProps {
  children?: React.ReactNode
  layoutProviderProps?: LayoutProviderProps['value']
}

const PageProvider: React.FC<PageProviderProps> = (props) => {
  const { children, layoutProviderProps } = props
  return (
    <LayoutProvider value={layoutProviderProps}>
      <SeoProvider>{children}</SeoProvider>
    </LayoutProvider>
  )
}

export default PageProvider
