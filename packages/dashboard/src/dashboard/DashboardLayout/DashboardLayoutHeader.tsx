import React from 'react'
import { Header, HeaderProps, IconButton } from '@gravis-os/ui'
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined'
import MenuIcon from '@mui/icons-material/Menu'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

export interface DashboardLayoutHeaderProps extends HeaderProps {}

const DashboardLayoutHeader: React.FC<DashboardLayoutHeaderProps> = (props) => {
  const { navItems, containerProps, toolbarProps, ...rest } = props

  return (
    <Header
      position="fixed"
      disableScrollTrigger
      {...rest}
      navItems={{
        left: [
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
        ],
        right: navItems?.right?.length && [
          ...navItems.right,
          {
            key: 'right-aside-menu-toggle',
            render: (props) => {
              const { setRightAsideOpen, rightAsideOpen } = props
              return (
                <IconButton
                  color="inherit"
                  edge="end"
                  onClick={() => setRightAsideOpen(!rightAsideOpen)}
                >
                  <InfoOutlinedIcon />
                </IconButton>
              )
            },
          },
        ],
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
