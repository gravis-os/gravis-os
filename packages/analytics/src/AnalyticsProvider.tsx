import React from 'react'

import { GtmPageViewNavigationEvents } from './GoogleTagManager'

export interface AnalyticsProviderProps {
  children?: React.ReactNode
}

const AnalyticsProvider: React.FC<AnalyticsProviderProps> = (props) => {
  const { children } = props

  return (<>
    {/* Set page view on route change */}
    <GtmPageViewNavigationEvents />
    {children}
  </>)
}

export default AnalyticsProvider
