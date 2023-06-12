import React from 'react'
import SeoProvider from './SeoProvider'
import LayoutProvider, { LayoutProviderProps } from './LayoutProvider'

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
