import React, { useState } from 'react'
import { DashboardLayout, DashboardLayoutProps } from '@gravis-os/dashboard'
import PosCart from './PosCart'
import posConfig from './posConfig'

export interface PosLayoutV2Props extends DashboardLayoutProps {}

const PosLayoutV2: React.FC<PosLayoutV2Props> = (props) => {
  const { children } = props

  const [isPosCartDrawerOpen, setIsPosCartDrawerOpen] = useState(true)

  return (
    <DashboardLayout
      disableResponsiveCollapse
      headerHeight={posConfig.appBarHeight}
      // Right Aside
      rightAside={<PosCart />}
      rightAsideOpen={isPosCartDrawerOpen}
      setRightAsideOpen={setIsPosCartDrawerOpen}
      rightAsideWidth={posConfig.cartDrawerMaxWidth}
    >
      {children}
    </DashboardLayout>
  )
}

export default PosLayoutV2
