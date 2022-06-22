import React from 'react'
import Headroom from 'react-headroom'
import MenuIcon from '@mui/icons-material/Menu'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import {
  AppBar,
  AppBarProps,
  Box,
  Button,
  Container,
  IconButton,
  List,
  SwipeableDrawer,
  Toolbar,
} from '@mui/material'
import RouterLink from 'next/link'
import { SxProps } from '@mui/system'
import HeaderSearch, { HeaderSearchProps } from './HeaderSearch'
import NavAccordion from '../NavAccordion'
import HeaderButtonWithMenu, {
  HeaderButtonWithMenuProps,
  NavItemClickFunction,
} from './HeaderButtonWithMenu'

// Constants
const DRAWER_ANCHOR_POSITION = 'right'
const DRAWER_WIDTH = 250

// Presets
export const NAV_ITEM_SEARCH_PRESET = 'NAV_ITEM_SEARCH_PRESET'

interface HeaderNavItem extends HeaderButtonWithMenuProps {
  // Clicks
  href?: string
  onClick?: NavItemClickFunction

  sx?: SxProps
  children?: React.ReactNode

  // Custom
  hideInMobileDrawer?: boolean
  showInMobileBar?: boolean
  preset?: NavItemSearchPreset
}

// Presets
interface NavItemSearchPreset extends HeaderSearchProps {
  type: typeof NAV_ITEM_SEARCH_PRESET
}

export interface HeaderProps extends AppBarProps {
  navItems:
    | HeaderNavItem[]
    | {
        left?: HeaderNavItem[]
        center?: HeaderNavItem[]
        right?: HeaderNavItem[]
      }
  logo?: React.ElementType
  transparent?: boolean
}

const Header: React.FC<HeaderProps> = (props) => {
  const { transparent, logo: Logo, navItems, ...rest } = props

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
      case NAV_ITEM_SEARCH_PRESET:
        return <HeaderSearch {...presetProps} />
      default:
        return null
    }
  }
  const renderNavItems = (navItems) => {
    if (!Array.isArray(navItems)) return null

    return navItems.map((navItem: HeaderNavItem) => {
      const { name, children, showInMobileBar, preset } = navItem

      // Get key
      const key = name

      // Get classes
      const navItemWrapperProps = {
        key,
        sx: {
          display: { xs: 'none', md: 'block' },
          ...(showInMobileBar && { display: 'block' }),
        },
      }

      switch (true) {
        // Render children override
        case Boolean(children):
          return (
            <Box component="div" {...navItemWrapperProps}>
              {children}
            </Box>
          )
        // Render presets
        case Boolean(preset):
          return (
            <Box component="div" {...navItemWrapperProps}>
              {renderPreset(navItem)}
            </Box>
          )
        // Render children
        default:
          const renderHeaderNavItemButton = (navItem: HeaderNavItem) => {
            const { ButtonProps, onClick: injectedOnClick, ...rest } = navItem
            const { items, renderItems } = rest

            // Render nested menu if hasItems
            const hasNestedMenu = items?.length > 0 || Boolean(renderItems)

            // Calculate button props
            const nextButtonProps = {
              ...ButtonProps,
              sx: {
                ...ButtonProps?.sx,
                padding: (theme) => theme.spacing(1.5, 2),
                borderRadius: 0,
              },
            }
            if (injectedOnClick)
              nextButtonProps.onClick = (e) => injectedOnClick(e, navItem)

            const navItemButtonJsx = hasNestedMenu ? (
              <HeaderButtonWithMenu
                ButtonProps={nextButtonProps}
                name={key}
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
        name,
        isOpenOnHover,
        onClick: injectedOnClick,
        renderItems,
        fullWidth,
        preset,
        hideInMobileDrawer,
        showInMobileBar,
        ...accordionLinksNavItem
      } = navItem

      const key = name

      if (preset)
        return (
          <React.Fragment key={key}>{renderPreset(navItem)}</React.Fragment>
        )

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
  const navItemGroupSx = { display: 'flex', alignItems: 'center' }

  return (
    <Box component={Headroom} sx={{ position: 'relative', zIndex: 'appBar' }}>
      <AppBar
        position={transparent ? 'absolute' : 'sticky'}
        color={transparent ? 'transparent' : 'inherit'}
        {...rest}
        sx={{
          boxShadow:
            '0 0 1px 0 rgb(0 0 0 / 5%), 0 3px 4px -2px rgb(0 0 0 / 8%)',
          color: transparent ? 'white' : 'inherit',
          ...rest?.sx,
        }}
      >
        <Container>
          <Toolbar variant="dense" sx={{ justifyContent: 'space-between' }}>
            {/* Left */}
            <Box display="flex" alignItems="center">
              {Logo && <Logo />}
              {isGroupedNavItems && (
                <Box ml={Logo ? 2 : -2} sx={navItemGroupSx}>
                  {renderNavItems('left' in navItems && navItems.left)}
                </Box>
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
            <Box sx={navItemGroupSx}>
              {renderNavItems(
                isGroupedNavItems
                  ? 'right' in navItems && navItems.right
                  : navItems
              )}
            </Box>

            {/* Hamburger menu */}
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
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
    </Box>
  )
}

export default Header
