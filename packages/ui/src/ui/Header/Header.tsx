import React from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import {
  AppBar,
  AppBarProps,
  Box,
  Button,
  ButtonProps,
  IconButton,
  List,
  SwipeableDrawer,
  Toolbar,
  ToolbarProps,
} from '@mui/material'
import RouterLink from 'next/link'
import { SxProps } from '@mui/system'
import HeaderSearch from './HeaderSearch'
import NavAccordion from '../NavAccordion'
import HeaderButtonWithMenu, {
  HeaderButtonWithMenuProps,
  NavItemClickFunction,
} from './HeaderButtonWithMenu'
import Container, { ContainerProps } from '../Container'
import HideOnScroll from './HideOnScroll'

// Constants
const DRAWER_ANCHOR_POSITION = 'right'
const DRAWER_WIDTH = 320

// Presets
export const NAV_ITEM_SEARCH_PRESET = 'search'

export interface HeaderNavItem extends HeaderButtonWithMenuProps {
  // Clicks
  href?: string
  onClick?: NavItemClickFunction

  sx?: SxProps
  children?: React.ReactNode

  // Custom
  hideInMobileDrawer?: boolean
  showOnMobileBar?: boolean
  preset?: any // NavItemSearchPreset
  render?: (renderProps: any) => React.ReactNode
}

export interface HeaderProps extends AppBarProps {
  containerProps?: ContainerProps
  toolbarProps?: ToolbarProps
  navItems:
    | HeaderNavItem[]
    | {
        left?: HeaderNavItem[]
        center?: HeaderNavItem[]
        right?: HeaderNavItem[]
      }
  transparent?: boolean
  disableBoxShadow?: boolean
  renderProps?: any
  darkText?: boolean
  center?: boolean
}

const Header: React.FC<HeaderProps> = (props) => {
  const {
    containerProps,
    toolbarProps,
    disableBoxShadow,
    transparent,
    navItems,
    renderProps,
    darkText,
    center,
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
        return <HeaderSearch {...presetProps} />
      default:
        return null
    }
  }
  const renderNavItems = (navItems) => {
    if (!Array.isArray(navItems)) return null

    return navItems.map((navItem: HeaderNavItem) => {
      const { key, children, showOnMobileBar, preset, render, sx } = navItem

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
        case Boolean(render):
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
            const { buttonProps, onClick: injectedOnClick, ...rest } = navItem
            const { items, renderItems } = rest

            // Render nested menu if hasItems
            const hasNestedMenu = items?.length > 0 || Boolean(renderItems)

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
            }

            const navItemButtonJsx = hasNestedMenu ? (
              <HeaderButtonWithMenu
                key={key}
                buttonProps={nextButtonProps}
                {...rest}
              />
            ) : (
              <Button color="inherit" {...nextButtonProps}>
                {navItem.title}
              </Button>
            )

            if (navItem.href) {
              return (
                <RouterLink href={navItem.href} passHref>
                  {navItemButtonJsx}
                </RouterLink>
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

  return (
    <HideOnScroll threshold={10}>
      <AppBar
        position={transparent ? 'absolute' : 'sticky'}
        {...(transparent && { color: 'transparent' })}
        {...rest}
        sx={{
          zIndex: (theme) => theme.zIndex.appBar + 1,
          width: '100%',

          // Scroll
          overflowX: 'scroll',
          overflowY: 'hidden',
          '&::-webkit-scrollbar': { display: 'none' },

          // Box Shadow
          boxShadow: disableBoxShadow
            ? 'none'
            : '0 0 1px 0 rgb(0 0 0 / 5%), 0 3px 4px -2px rgb(0 0 0 / 8%)',

          // Transparent
          ...(transparent && !darkText && { color: 'white' }),

          ...rest?.sx,
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
                isGroupedNavItems
                  ? 'left' in navItems && navItems.left
                  : navItems
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
          anchor={DRAWER_ANCHOR_POSITION}
          open={isDrawerOpen}
          onOpen={openDrawer}
          onClose={closeDrawer}
        >
          <Box
            width={DRAWER_WIDTH}
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
    </HideOnScroll>
  )
}

export default Header
