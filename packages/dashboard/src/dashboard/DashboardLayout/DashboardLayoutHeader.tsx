import React from 'react'
import { Header, HeaderProps, IconButton } from '@gravis-os/ui'
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined'
import MenuIcon from '@mui/icons-material/Menu'

export interface DashboardLayoutHeaderProps extends HeaderProps {
  hideLeftAsideMenuToggle?: boolean
}

const DashboardLayoutHeader: React.FC<DashboardLayoutHeaderProps> = (props) => {
  const {
    navItems,
    containerProps,
    toolbarProps,
    hideLeftAsideMenuToggle,
    ...rest
  } = props

  const leftNavItems = hideLeftAsideMenuToggle
    ? [...navItems?.left]
    : [
        {
          key: 'left-aside-menu-toggle',
          render: (props) => {
            const { setLeftAsideOpen, leftAsideOpen, isLeftAsideOpen } = props
            return (
              <IconButton
                color="inherit"
                edge="start"
                onClick={() => setLeftAsideOpen(!leftAsideOpen)}
                sx={{ mr: 1 }}
              >
                {isLeftAsideOpen ? <MenuOpenOutlinedIcon /> : <MenuIcon />}
              </IconButton>
            )
          },
          showOnMobileBar: true,
        },
        ...navItems?.left,
      ]

  return (
    <Header
      position="fixed"
      disableScrollTrigger
      {...rest}
      navItems={{
        left: leftNavItems,
        right: navItems?.right?.length && [...navItems.right],
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
