import React, { useState } from 'react'

import { DashboardLayout, DashboardLayoutProps } from '@gravis-os/dashboard'
import { Typography } from '@gravis-os/ui'

import PosCart, { PosCartProps } from './PosCart'
import posConfig from './posConfig'

export interface PosLayoutProps extends DashboardLayoutProps {
  cartProps?: PosCartProps
  navItemCenterTitle?: string
  navItemLeftTitle?: string
  navItemRightTitle?: string
}

const PosLayout: React.FC<PosLayoutProps> = (props) => {
  const {
    cartProps,
    navItemCenterTitle,
    navItemLeftTitle,
    navItemRightTitle,
    ...rest
  } = props
  const [isPosCartDrawerOpen, setIsPosCartDrawerOpen] = useState(true)
  return (
    <DashboardLayout
      defaultLeftAsideOpen={false}
      disablePadding
      disableResponsiveCollapse
      // Header
      headerHeight={posConfig.appBarHeight}
      headerProps={{
        center: true,
        color: 'secondary',
        navItems: {
          ...(navItemLeftTitle && {
            left: [
              {
                children: (
                  <Typography color="inherit" variant="h4">
                    {navItemLeftTitle}
                  </Typography>
                ),
                key: 'left',
              },
            ],
          }),
          ...(navItemCenterTitle && {
            center: [
              {
                children: (
                  <Typography color="inherit" variant="h4">
                    {navItemCenterTitle}
                  </Typography>
                ),
                key: 'center',
              },
            ],
          }),
          ...(navItemRightTitle && {
            right: [
              {
                children: (
                  <Typography color="inherit" variant="h4">
                    {navItemRightTitle}
                  </Typography>
                ),
                key: 'right',
              },
            ],
          }),
        },
      }}
      // Right Aside
      rightAside={<PosCart {...cartProps} />}
      rightAsideOpen={isPosCartDrawerOpen}
      rightAsideWidth={posConfig.cartDrawerMaxWidth}
      setRightAsideOpen={setIsPosCartDrawerOpen}
      {...rest}
    />
  )
}

export default PosLayout
