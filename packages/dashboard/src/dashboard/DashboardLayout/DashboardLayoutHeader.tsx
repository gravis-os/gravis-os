import React from 'react'

import { Header, HeaderProps, IconButton } from '@gravis-os/ui'
import MenuIcon from '@mui/icons-material/Menu'
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined'

export interface DashboardLayoutHeaderProps extends HeaderProps {
  showLeftMenuToggle?: boolean
}

const DashboardLayoutHeader: React.FC<DashboardLayoutHeaderProps> = (props) => {
  const {
    containerProps,
    navItems,
    showLeftMenuToggle,
    toolbarProps,
    ...rest
  } = props

  const injectedLeftNavItems = navItems?.left || []
  const injectedCenterNavItems = navItems?.center || []
  const injectedRightNavItems = navItems?.right || []

  const leftNavItems =
    injectedLeftNavItems.length > 0
      ? [
          ...(injectedLeftNavItems.length > 0 && [
            ...(showLeftMenuToggle
              ? [
                  {
                    key: 'left-aside-menu-toggle',
                    render: (props) => {
                      const {
                        isLeftAsideOpen,
                        leftAsideOpen,
                        setLeftAsideOpen,
                      } = props
                      return (
                        <IconButton
                          color="inherit"
                          edge="start"
                          onClick={() => setLeftAsideOpen(!leftAsideOpen)}
                          sx={{ mr: 1 }}
                        >
                          {isLeftAsideOpen ? (
                            <MenuOpenOutlinedIcon />
                          ) : (
                            <MenuIcon />
                          )}
                        </IconButton>
                      )
                    },
                    showOnMobileBar: true,
                  },
                ]
              : []),
          ]),
          ...injectedLeftNavItems,
        ]
      : []

  return (
    <Header
      disableScrollTrigger
      position="fixed"
      {...rest}
      containerProps={{ maxWidth: false, ...containerProps }}
      navItems={{
        center: injectedCenterNavItems,
        left: leftNavItems,
        right: injectedRightNavItems,
      }}
      toolbarProps={{
        variant: 'regular',
        ...toolbarProps,
      }}
    />
  )
}

export default DashboardLayoutHeader
