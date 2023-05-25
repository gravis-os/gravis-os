import React, { useState } from 'react'
import { DashboardLayout, DashboardLayoutProps } from '@gravis-os/dashboard'
import { Typography } from '@gravis-os/ui'
import PosCart, { PosCartProps } from './PosCart'
import posConfig from './posConfig'

export interface PosLayoutProps extends DashboardLayoutProps {
  navItemLeftTitle?: string
  navItemCenterTitle?: string
  navItemRightTitle?: string
  cartProps?: PosCartProps
}

const PosLayout: React.FC<PosLayoutProps> = (props) => {
  const {
    navItemLeftTitle,
    navItemCenterTitle,
    navItemRightTitle,
    cartProps,
    ...rest
  } = props
  const [isPosCartDrawerOpen, setIsPosCartDrawerOpen] = useState(true)
  return (
    <DashboardLayout
      disablePadding
      defaultLeftAsideOpen={false}
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
                key: 'left',
                children: (
                  <Typography variant="h4" color="inherit">
                    {navItemLeftTitle}
                  </Typography>
                ),
              },
            ],
          }),
          ...(navItemCenterTitle && {
            center: [
              {
                key: 'center',
                children: (
                  <Typography variant="h4" color="inherit">
                    {navItemCenterTitle}
                  </Typography>
                ),
              },
            ],
          }),
          ...(navItemRightTitle && {
            right: [
              {
                key: 'right',
                children: (
                  <Typography variant="h4" color="inherit">
                    {navItemRightTitle}
                  </Typography>
                ),
              },
            ],
          }),
        },
      }}
      // Right Aside
      rightAside={<PosCart {...cartProps} />}
      rightAsideOpen={isPosCartDrawerOpen}
      setRightAsideOpen={setIsPosCartDrawerOpen}
      rightAsideWidth={posConfig.cartDrawerMaxWidth}
      {...rest}
    />
  )
}

export default PosLayout
