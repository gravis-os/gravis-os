import React, { useState } from 'react'
import { DashboardLayout, DashboardLayoutProps } from '@gravis-os/dashboard'
import PosCart from './PosCart'
import posConfig from './posConfig'

export interface PosLayoutProps extends DashboardLayoutProps {}

const PosLayout: React.FC<PosLayoutProps> = (props) => {
  const [isPosCartDrawerOpen, setIsPosCartDrawerOpen] = useState(true)

  return (
    <DashboardLayout
      disablePadding
      defaultLeftAsideOpen={false}
      disableResponsiveCollapse
      headerHeight={posConfig.appBarHeight}
      // Right Aside
      rightAside={<PosCart />}
      rightAsideOpen={isPosCartDrawerOpen}
      setRightAsideOpen={setIsPosCartDrawerOpen}
      rightAsideWidth={posConfig.cartDrawerMaxWidth}
      {...props}
    />
  )
}

export default PosLayout
