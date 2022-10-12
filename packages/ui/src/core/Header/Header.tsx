import React from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined'
import {
  Box,
  Button,
  ButtonProps,
  IconButton,
  List,
  SwipeableDrawer,
  Toolbar,
  ToolbarProps,
} from '@mui/material'
import { SxProps } from '@mui/system'
import HeaderSearch, { HeaderSearchProps } from './HeaderSearch'
import NavAccordion from '../NavAccordion'
import HeaderButtonWithMenu, {
  HeaderButtonWithMenuProps,
  NavItemClickFunction,
} from './HeaderButtonWithMenu'
import Container, { ContainerProps } from '../Container'
import HideOnScroll from './HideOnScroll'
import Link from '../Link'
import Typography from '../Typography'
import AppBar, { AppBarProps } from '../AppBar'

export interface HeaderNavItem
  extends Omit<HeaderButtonWithMenuProps, 'title'> {
  sx?: SxProps
  title?: HeaderButtonWithMenuProps['title']
  children?: React.ReactNode

  // Clicks
  href?: string
  onClick?: NavItemClickFunction

  // Custom
  hideInMobileDrawer?: boolean
  showOnMobileBar?: boolean
  preset?: {
    type: 'search'
  } & Record<string, unknown> // NavItemSearchPreset
  render?: (renderProps: any) => React.ReactNode
}

export interface HeaderProps extends AppBarProps {
  containerProps?: ContainerProps
  toolbarProps?: ToolbarProps
  navItems: {
    left?: HeaderNavItem[]
    center?: HeaderNavItem[]
    right?: HeaderNavItem[]
  }
  renderProps?: any
  center?: boolean
  disableScrollTrigger?: boolean
  disableSticky?: boolean
  announcements?: Array<{ title: string }>
}

/**
 * This component is loaded with many features.
 * It should be outside of the ui package.
 * @param props
 * @constructor
 */
const Header: React.FC<HeaderProps> = (props) => {
  const {
    containerProps,
    center,
    disableScrollTrigger,
    disableSticky,
    navItems,
    announcements,
    renderProps,
    toolbarProps,
    ...rest
  } = props

  // State
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
  const openDrawer = () => setIsDrawerOpen(true)
  const closeDrawer = () => setIsDrawerOpen(false)

  // Grouped navItems
  const isGroupedNavItems =
    typeof navItems === 'object' && !Array.isArray(navItems)
  const hasNavItemCenterGroup = isGroupedNavItems && 'center' in navItems

  // ==============================
  // Renders
  // ==============================
  const renderPreset = (navItem: HeaderNavItem) => {
    const { preset } = navItem
    const { type, ...presetProps } = preset

    switch (type) {
      case 'search':
        return (
          <HeaderSearch {...(presetProps as unknown as HeaderSearchProps)} />
        )
      default:
        return null
    }
  }
  const renderNavItems = (navItems) => {
    if (
      !navItems ||
      !Array.isArray(navItems) ||
      navItems.filter(Boolean).length === 0
    )
      return null

    return navItems.map((navItem: HeaderNavItem, i) => {
      const {
        linkProps,
        key: injectedKey,
        children,
        showOnMobileBar,
        preset,
        render,
        sx,
      } = navItem

      if (!navItem) return null

      const key = injectedKey || `nav-item-${i}`

      // Get classes
      const navItemWrapperProps = {
        key,
        sx: {
          display: { xs: 'none', md: 'flex' },
          ...(showOnMobileBar && { display: 'flex' }),
          '& > button': { whiteSpace: 'nowrap' },
          ...sx,
        },
      }

      switch (true) {
        // Render with renderProps to access state
        case typeof render === 'function':
          return (
            <Box component="div" alignItems="center" {...navItemWrapperProps}>
              {render({ ...renderProps, navItem })}
            </Box>
          )
        // Render children override
        case Boolean(children):
          return (
            <Box component="div" alignItems="center" {...navItemWrapperProps}>
              {children}
            </Box>
          )
        // Render presets
        case Boolean(preset):
          return (
            <Box component="div" alignItems="center" {...navItemWrapperProps}>
              {renderPreset(navItem)}
            </Box>
          )
        // Render children
        default:
          const renderHeaderNavItemButton = (navItem: HeaderNavItem) => {
            const {
              disableNewTabIcon,
              buttonProps,
              onClick: injectedOnClick,
              ...rest
            } = navItem
            const { items, renderItems, href, linkProps } = rest

            // Render nested menu if hasItems
            const hasNestedMenu = items?.length > 0 || Boolean(renderItems)

            const isExternalLink =
              href?.includes('https://') || href?.includes('http://')
            const isOpenInNewTab = linkProps?.target === '_blank'
            const shouldShowNewTabIcon =
              !disableNewTabIcon && isExternalLink && isOpenInNewTab

            // Calculate button props
            const nextButtonProps: ButtonProps = {
              ...buttonProps,
              sx: {
                ...buttonProps?.sx,
                padding: (theme) => theme.spacing(1.5, 2),
                borderRadius: 0,
                whiteSpace: 'nowrap',
              },
              ...(injectedOnClick && {
                onClick: (e) => injectedOnClick(e, navItem),
              }),
              ...(shouldShowNewTabIcon && {
                endIcon: (
                  <LaunchOutlinedIcon
                    sx={{ '&&': { fontSize: 16, ml: -0.5 } }}
                  />
                ),
              }),
            }

            const navItemButtonJsx = hasNestedMenu ? (
              <HeaderButtonWithMenu
                key={key}
                buttonProps={nextButtonProps}
                {...(rest as HeaderButtonWithMenuProps)}
              />
            ) : (
              <Button color="inherit" {...nextButtonProps}>
                {navItem.title}
              </Button>
            )

            if (navItem.href) {
              return (
                <Link
                  href={navItem.href}
                  color="inherit"
                  underline="none"
                  fadeOnHover
                  {...linkProps}
                >
                  {navItemButtonJsx}
                </Link>
              )
            }

            return navItemButtonJsx
          }
          return (
            <Box {...navItemWrapperProps}>
              {renderHeaderNavItemButton(navItem)}
            </Box>
          )
      }
    })
  }
  const renderMobileNavItems = (navItems) => {
    const getCombinedMobileNavItems = (navItems) => {
      return Object.values(navItems).reduce(
        (acc: HeaderNavItem[], navItemGroup: HeaderNavItem[]) => {
          if (!navItemGroup) return acc
          const navItemGroupWithoutHideOnMobile = navItemGroup.filter(
            (navItemGroupItem) => !navItemGroupItem.hideInMobileDrawer
          )
          return [...acc, ...navItemGroupWithoutHideOnMobile]
        },
        []
      )
    }

    const mobileNavItems = isGroupedNavItems
      ? getCombinedMobileNavItems(navItems)
      : navItems

    return mobileNavItems.map((navItem) => {
      // Omit redundant props
      const {
        key,
        isOpenOnHover,
        onClick: injectedOnClick,
        renderItems,
        fullWidth,
        preset,
        hideInMobileDrawer,
        showOnMobileBar,
        ...accordionLinksNavItem
      } = navItem

      if (preset) {
        return (
          <React.Fragment key={key}>{renderPreset(navItem)}</React.Fragment>
        )
      }

      return (
        <NavAccordion
          key={key}
          onClick={(e) => {
            closeDrawer()
            if (injectedOnClick) injectedOnClick(e, navItem)
          }}
          {...accordionLinksNavItem}
        />
      )
    })
  }

  // Sx
  const navItemGroupSx = { display: 'flex', alignItems: 'stretch' }

  // ChildrenJsx
  const childrenJsx = (
    <AppBar
      {...{
        ...rest,
        ...(disableSticky && { position: 'static' }),
      }}
    >
      <Container {...containerProps}>
        <Toolbar
          disableGutters
          variant="dense"
          {...toolbarProps}
          sx={{
            justifyContent: 'space-between',
            alignItems: 'stretch',
            ...toolbarProps?.sx,
          }}
        >
          {/* Left */}
          <Box sx={navItemGroupSx}>
            {renderNavItems(
              isGroupedNavItems ? 'left' in navItems && navItems.left : navItems
            )}
          </Box>

          {/* Center */}
          <Box
            sx={{
              ...navItemGroupSx,
              flexGrow: 1,
              justifyContent: 'center',
              textAlign: 'center',
              '& > *': { width: '100%' },

              // Flex box if we pass in center: true
              ...(center && {
                '& > .MuiBox-root': {
                  justifyContent: 'center',
                },
              }),

              ...(hasNavItemCenterGroup && {
                marginLeft: { xs: 6, md: 2 },
                marginRight: 2,
              }),
            }}
          >
            {isGroupedNavItems &&
              renderNavItems('center' in navItems && navItems.center)}
          </Box>

          {/* Right */}
          <Box
            sx={{
              ...navItemGroupSx,

              // Flex box if we pass in center: true
              ...(center && {
                '& > .MuiBox-root': {
                  justifyContent: 'flex-end',
                },
              }),
            }}
          >
            {renderNavItems(
              isGroupedNavItems && 'right' in navItems && navItems.right
            )}
          </Box>

          {/* Hamburger menu */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={openDrawer}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile navItems */}
      <SwipeableDrawer
        anchor="right"
        open={isDrawerOpen}
        onOpen={openDrawer}
        onClose={closeDrawer}
      >
        <Box
          width={320}
          role="presentation"
          onKeyDown={(e) => {
            if (e.key === 'Escape') return closeDrawer()
          }}
        >
          <Box textAlign="right">
            <IconButton color="inherit" onClick={closeDrawer}>
              <CloseOutlinedIcon />
            </IconButton>
          </Box>
          <List dense sx={{ py: 0 }}>
            {renderMobileNavItems(navItems)}
          </List>
        </Box>
      </SwipeableDrawer>
    </AppBar>
  )

  return (
    <>
      {Boolean(announcements?.length) && (
        <Box
          sx={{
            py: 0.5,
            backgroundColor: 'secondary.main',
            color: 'secondary.contrastText',
            textAlign: 'center',
          }}
        >
          <Container {...containerProps}>
            <Typography variant="subtitle2" color="inherit">
              {announcements[0]?.title}
            </Typography>
          </Container>
        </Box>
      )}

      {!disableScrollTrigger ? (
        <HideOnScroll threshold={10}>{childrenJsx}</HideOnScroll>
      ) : (
        childrenJsx
      )}
    </>
  )
}

export default Header
