import React, { Suspense, SuspenseProps } from 'react'

import NavigationEvents, { NavigationEventsProps } from './NavigationEvents'

export interface SuspenseNavigationEventsProps extends NavigationEventsProps {
  suspenseProps?: SuspenseProps
}

const SuspenseNavigationEvents: React.FC<SuspenseNavigationEventsProps> = (
  props
) => {
  const { suspenseProps, ...rest } = props
  return (
    <Suspense fallback={null} {...suspenseProps}>
      <NavigationEvents {...rest} />
    </Suspense>
  )
}

export default SuspenseNavigationEvents
