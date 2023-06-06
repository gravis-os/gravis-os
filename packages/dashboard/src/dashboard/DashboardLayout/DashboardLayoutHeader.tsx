import React from 'react'
import { Header, HeaderProps, IconButton } from '@gravis-os/ui'
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined'
import MenuIcon from '@mui/icons-material/Menu'

export interface DashboardLayoutHeaderProps extends HeaderProps {
  showLeftMenuToggle?: boolean
}

const DashboardLayoutHeader: React.FC<DashboardLayoutHeaderProps> = (props) => {
  const {
    navItems,
    containerProps,
    toolbarProps,
    showLeftMenuToggle,
    ...rest
  } = props

  const injectedLeftNavItems = navItems?.left || []
  const injectedCenterNavItems = navItems?.center || []
  const injectedRightNavItems = navItems?.right || []

  const leftNavItems = injectedLeftNavItems.length
    ? [
        ...(Boolean(injectedLeftNavItems.length) && [
          ...(showLeftMenuToggle
            ? [
                {
                  key: 'left-aside-menu-toggle',
                  render: (props) => {
                    const { setLeftAsideOpen, leftAsideOpen, isLeftAsideOpen } =
                      props
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
      position="fixed"
      disableScrollTrigger
      {...rest}
      navItems={{
        left: leftNavItems,
        center: injectedCenterNavItems,
        right: injectedRightNavItems,
      }}
      containerProps={{ maxWidth: false, ...containerProps }}
      toolbarProps={{
        variant: 'regular',
        ...toolbarProps,
      }}
    />
  )
}

export default DashboardLayoutHeader
