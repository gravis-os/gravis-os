'use client'
import React, { useEffect } from 'react'

import { WithPaletteModeProps, withPaletteMode } from '@gravis-os/theme'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined'
import MenuIcon from '@mui/icons-material/Menu'
import {
  Button,
  ButtonProps,
  IconButton,
  List,
  SwipeableDrawer,
  Toolbar,
  ToolbarProps,
  useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { SxProps } from '@mui/system'
import useScrollPosition from '@react-hook/window-scroll'
import flowRight from 'lodash/flowRight'
import merge from 'lodash/merge'
import { useRouter, usePathname } from 'next/navigation'

import useOpen from '../../hooks/useOpen'
import AppBar, { AppBarProps } from '../AppBar'
import Box, { BoxProps } from '../Box'
import Container, { ContainerProps } from '../Container'
import Image, { ImageProps } from '../Image'
import Link from '../Link'
import NavAccordion, { NavAccordionProps } from '../NavAccordion'
import HeaderAnnouncement, {
  HeaderAnnouncementProps,
} from './HeaderAnnouncement'
import HeaderButtonWithMenu, {
  HeaderButtonWithMenuProps,
  NavItemClickFunction,
} from './HeaderButtonWithMenu'
import HeaderSearch, { HeaderSearchProps } from './HeaderSearch'
import HideOnScroll from './HideOnScroll'

export interface HeaderNavItem
  extends Omit<HeaderButtonWithMenuProps, 'title'> {
  children?: React.ReactNode
  // Custom
  hideInMobileDrawer?: boolean
  // Clicks
  href?: string
  key: string

  offsetLeft?: boolean
  onClick?: NavItemClickFunction

  preset?: {
    type: 'logo' | 'search'
  } & Record<string, unknown> // NavItemSearchPreset
  render?: (renderProps: any) => React.ReactNode
  showOnMobileBar?: boolean
  sx?: SxProps
  title?: HeaderButtonWithMenuProps['title']
}

export interface HeaderProps extends AppBarProps, WithPaletteModeProps {
  accordionProps?: Omit<NavAccordionProps, 'title'>
  announcement?: HeaderAnnouncementProps
  center?: boolean
  containerProps?: ContainerProps
  disableRightDrawer?: boolean
  disableScrollTrigger?: boolean
  disableSticky?: boolean
  drawerWidth?: BoxProps['width']
  height?: number
  invertLogo?: boolean
  navItems: {
    center?: HeaderNavItem[]
    left?: HeaderNavItem[]
    right?: HeaderNavItem[]
  }
  renderProps?: any
  textColor?: string
  toolbarProps?: ToolbarProps
  /**
   * The scroll position at which the header will become translucent instead.
   */
  translucentAtScrollY?: number
}

// ==============================
// Methods
// ==============================
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
const withInvertLogoInNavItems =
  ({ invertLogo, isTranslucentAtScrollY, translucentAtScrollY }) =>
  (navItems: HeaderProps['navItems']) => {
    return Object.entries(navItems).reduce((acc, [key, value]) => {
      // key here is left, center, or right
      // value here is HeaderNavItem[]

      const nextValue = value.map((val) => {
        const { preset } = val

        // We are only interested in mutating the preset.type === logo in this func
        if (preset?.type === 'logo') {
          return merge({}, val, {
            preset: {
              logoProps: {
                // We only want to invert the logo if the translucentAtScrollY prop is provided
                ...((invertLogo || translucentAtScrollY) && {
                  invertImage: !isTranslucentAtScrollY,
                }),
              },
            },
          })
        }

        return val
      })
      return { ...acc, [key]: nextValue }
    }, {})
  }

// ==============================
// Renders
// ==============================
const renderNavItemPreset = (props: {
  boxProps?: BoxProps
  isMobile?: boolean
  navItem: HeaderNavItem
}) => {
  const { boxProps, isMobile, navItem } = props
  const { preset } = navItem
  const { type, ...presetProps } = preset

  switch (type) {
    case 'logo': {
      const logoImageProps = {
        ...(preset.logoProps as ImageProps),
        sx: {
          ...(preset.logoProps as ImageProps)?.sx,
          // Fix visual alignment
          position: 'relative',
          top: 1.5,
        },
      } as ImageProps
      const logoChildrenJsx = <Image {...logoImageProps} />

      return (
        <Box
          href="/"
          {...boxProps}
          sx={{
            // Hover effects
            '&:hover': { backgroundColor: 'action.hover' },
            // Ensure that the box is stretched out vertically
            height: '100%',
            // Offset margin left against the px
            ml: -2,
            // Adds a gutter between the logo and other navItems
            px: 2,
            // Mobile props
            ...(isMobile && { ml: 0, px: 3, py: 1.5 }),
            // Rest
            ...boxProps?.sx,
            // Overwrite to ensure that logo is always shown
            display: 'flex',
          }}
        >
          {logoChildrenJsx}
        </Box>
      )
    }
    case 'search': {
      return <HeaderSearch {...(presetProps as unknown as HeaderSearchProps)} />
    }
    default: {
      return null
    }
  }
}
const renderNavItems = (navItems, props) => {
  const { renderProps, router } = props

  if (
    !navItems ||
    !Array.isArray(navItems) ||
    navItems.filter(Boolean).length === 0
  )
    return null

  return navItems.filter(Boolean).map((navItem: HeaderNavItem, i) => {
    const { children, offsetLeft, preset, render, showOnMobileBar, sx } =
      navItem

    if (!navItem) return null

    const key = `nav-item-${i}`

    // Get classes
    const boxProps = {
      alignItems: 'center',
      component: 'div' as const,
      key,
      sx: {
        '& > button': { whiteSpace: 'nowrap' },
        display: { xs: 'none', md: 'flex' },
        ...(showOnMobileBar && { display: 'flex' }),
        ...(offsetLeft && { ml: -2 }),
        ...sx,
      },
    }

    switch (true) {
      // Render with renderProps to access state
      case typeof render === 'function': {
        return <Box {...boxProps}>{render({ ...renderProps, navItem })}</Box>
      }
      // Render children override
      case Boolean(children): {
        return <Box {...boxProps}>{children}</Box>
      }
      // Render presets
      case Boolean(preset): {
        return renderNavItemPreset({ boxProps, navItem })
      }
      // Render children
      default: {
        const renderHeaderNavItemButton = (navItem: HeaderNavItem) => {
          const {
            buttonProps,
            disableNewTabIcon,
            onClick: injectedOnClick,
            ...rest
          } = navItem
          const { href, items, linkProps, renderItems } = rest

          // Render nested menu if hasItems
          const hasNestedMenu = items?.length > 0 || Boolean(renderItems)

          // Check if is external link to render an icon
          const isExternalLink =
            href?.includes('https://') || href?.includes('http://')
          const isOpenInNewTab = linkProps?.target === '_blank'
          const shouldShowNewTabIcon =
            !disableNewTabIcon && isExternalLink && isOpenInNewTab

          // Check if isActive and show indicator
          const isActive = href !== '/' && router?.pathname.startsWith(href)

          // Calculate button props
          const nextButtonProps: ButtonProps = {
            ...buttonProps,
            sx: {
              height: '100%',
              lineHeight: 1,
              ...buttonProps?.sx,
              borderRadius: 0,
              p: 1.5,
              whiteSpace: 'nowrap',
              ...(isActive && {
                boxShadow: ({ palette }) =>
                  `inset 0 -1px 0 0px ${palette.secondary.main}`,
              }),
            },
            ...(injectedOnClick && {
              onClick: (e) => injectedOnClick(e, navItem),
            }),
            ...(shouldShowNewTabIcon && {
              endIcon: (
                <LaunchOutlinedIcon sx={{ '&&': { fontSize: 16, ml: -0.5 } }} />
              ),
            }),
          }

          const navItemButtonJsx = hasNestedMenu ? (
            <HeaderButtonWithMenu
              buttonProps={nextButtonProps}
              key={key}
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
                color="inherit"
                fadeOnHover
                href={navItem.href}
                underline="none"
                {...linkProps}
                sx={{ ...linkProps?.sx, height: '100%' }}
              >
                {navItemButtonJsx}
              </Link>
            )
          }

          return navItemButtonJsx
        }
        return <Box {...boxProps}>{renderHeaderNavItemButton(navItem)}</Box>
      }
    }
  })
}
const renderMobileNavItems = (navItems, props) => {
  const { accordionProps, closeDrawer, isGroupedNavItems } = props

  const mobileNavItems = (
    isGroupedNavItems ? getCombinedMobileNavItems(navItems) : navItems
  ).filter(Boolean)

  return mobileNavItems.map((navItem, i) => {
    // Omit redundant props
    const {
      fullWidth,
      hideInMobileDrawer,
      isOpenOnHover,
      onClick: injectedOnClick,
      preset,
      renderItems,
      showOnMobileBar,
      ...accordionLinksNavItem
    } = navItem

    const key = `mobile-nav-item-${i}`
    const boxProps = {
      alignItems: 'center',
      component: 'div' as const,
      key,
      sx: { display: 'flex', ...navItem.sx },
    }

    // Render
    switch (true) {
      case Boolean(preset): {
        return (
          <React.Fragment key={key}>
            {renderNavItemPreset({
              boxProps,
              isMobile: true,
              navItem,
            })}
          </React.Fragment>
        )
      }
      default: {
        return (
          <NavAccordion
            id={key}
            key={key}
            onClick={(e) => {
              closeDrawer()
              if (injectedOnClick) injectedOnClick(e, navItem)
            }}
            {...accordionProps}
            {...accordionLinksNavItem}
          />
        )
      }
    }
  })
}

// ==============================
// Main
// ==============================
/**
 * This component is loaded with many features.
 * It should be outside the ui package.
 * @param props
 * @constructor
 */
const Header: React.FC<HeaderProps> = (props) => {
  const {
    accordionProps,
    announcement,
    center,
    containerProps,
    dark,
    disableRightDrawer,
    disableScrollTrigger,
    disableSticky,
    drawerWidth = 320,
    height,
    invertLogo,
    mode,
    navItems: injectedNavItems,
    renderProps,
    sx,
    textColor = 'text.primary',
    toolbarProps,
    translucentAtScrollY,
    ...rest
  } = props

  // Router
  const router = useRouter()
  const pathname = usePathname()

  // State
  const [isDrawerOpen, { close: closeDrawer, open: openDrawer }] =
    useOpen(false)

  // Hide drawer on desktop
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  useEffect(() => {
    if (isDesktop && isDrawerOpen) closeDrawer()
  }, [isDesktop])

  // Hide drawer on route change on mobile
  useEffect(() => {
    if (isDrawerOpen && !isDesktop) closeDrawer()
  }, [pathname, isDesktop])

  // Convert transparent header to translucent after initial height
  const scrollY = useScrollPosition(60 /* 60 fps */)
  const isTranslucentAtScrollY = scrollY >= translucentAtScrollY

  // Process navItems (desktop) and mobileNavItems
  const cleanedNavItems = Object.entries(injectedNavItems).reduce(
    (acc, [key, value]) => {
      return { ...acc, [key]: value?.filter(Boolean) }
    },
    {}
  )
  const navItems = flowRight(
    withInvertLogoInNavItems({
      invertLogo,
      isTranslucentAtScrollY,
      translucentAtScrollY,
    })
  )(cleanedNavItems)
  const mobileNavItems = cleanedNavItems

  // Grouped navItems
  const isGroupedNavItems =
    typeof navItems === 'object' && !Array.isArray(navItems)
  const hasNavItemCenterGroup = isGroupedNavItems && 'center' in navItems
  const navItemGroupSx = { alignItems: 'stretch', display: 'flex' }
  const renderNavItemsProps = {
    ...props,

    closeDrawer,

    // Drawer
    isDrawerOpen,
    // Grouped
    isGroupedNavItems,
    openDrawer,

    // Router
    router,
  }

  // ChildrenJsx
  const childrenJsx = (
    <AppBar
      {...{
        sx: {
          color: isTranslucentAtScrollY ? 'text.primary' : textColor,
          ...sx,
        },
        ...rest,
        ...(disableSticky && { position: 'static' }),
        ...(isTranslucentAtScrollY && {
          translucent: true,
          transparent: false,
        }),
      }}
    >
      {announcement && (
        <HeaderAnnouncement
          {...{
            ...announcement,
            containerProps,
          }}
        />
      )}

      <Container {...containerProps}>
        <Toolbar
          disableGutters
          variant="dense"
          {...toolbarProps}
          sx={{
            alignItems: 'stretch',
            justifyContent: 'space-between',
            ...(typeof height === 'number' && { height }),
            ...toolbarProps?.sx,
          }}
        >
          {/* Left */}
          <Box sx={navItemGroupSx}>
            {renderNavItems(
              isGroupedNavItems
                ? 'left' in navItems && navItems.left
                : navItems,
              renderNavItemsProps
            )}
          </Box>

          {/* Center */}
          <Box
            sx={{
              ...navItemGroupSx,
              '& > *': { width: '100%' },
              flexGrow: 1,
              justifyContent: 'center',
              textAlign: 'center',

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
              renderNavItems(
                'center' in navItems && navItems.center,
                renderNavItemsProps
              )}
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
              isGroupedNavItems && 'right' in navItems && navItems.right,
              renderNavItemsProps
            )}
          </Box>

          {/* Hamburger menu */}
          {!disableRightDrawer && (
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                aria-label="menu"
                color="inherit"
                edge="end"
                onClick={openDrawer}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </Container>

      {/* Mobile navItems */}
      {!disableRightDrawer && (
        <SwipeableDrawer
          PaperProps={{ sx: { '&::-webkit-scrollbar': { display: 'none' } } }}
          anchor="right"
          onClose={closeDrawer}
          onOpen={openDrawer}
          open={isDrawerOpen}
        >
          <Box
            onKeyDown={(e) => {
              if (e.key === 'Escape') return closeDrawer()
            }}
            role="presentation"
            width={drawerWidth}
          >
            <Box textAlign="right">
              <IconButton color="inherit" onClick={closeDrawer}>
                <CloseOutlinedIcon />
              </IconButton>
            </Box>
            <List dense sx={{ py: 0 }}>
              {renderMobileNavItems(mobileNavItems, renderNavItemsProps)}
            </List>
          </Box>
        </SwipeableDrawer>
      )}
    </AppBar>
  )

  const childrenWithLayoutJsx = (
    <>
      {disableScrollTrigger ? (
        childrenJsx
      ) : (
        <HideOnScroll threshold={10}>{childrenJsx}</HideOnScroll>
      )}
    </>
  )

  return withPaletteMode({
    dark,
    mode,
  })(childrenWithLayoutJsx)
}

export default Header
