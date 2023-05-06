import React, { useEffect } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined'
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
import { SxProps } from '@mui/system'
import { useRouter } from 'next/router'
import { useTheme } from '@mui/material/styles'
import useScrollPosition from '@react-hook/window-scroll'
import { withPaletteMode, WithPaletteModeProps } from '@gravis-os/theme'
import flowRight from 'lodash/flowRight'
import merge from 'lodash/merge'
import HeaderSearch, { HeaderSearchProps } from './HeaderSearch'
import NavAccordion, { NavAccordionProps } from '../NavAccordion'
import HeaderButtonWithMenu, {
  HeaderButtonWithMenuProps,
  NavItemClickFunction,
} from './HeaderButtonWithMenu'
import Container, { ContainerProps } from '../Container'
import HideOnScroll from './HideOnScroll'
import Link from '../Link'
import Typography from '../Typography'
import Box, { BoxProps } from '../Box'
import Image, { ImageProps } from '../Image'
import AppBar, { AppBarProps } from '../AppBar'
import useOpen from '../../hooks/useOpen'

export interface HeaderNavItem
  extends Omit<HeaderButtonWithMenuProps, 'title'> {
  key: string
  sx?: SxProps
  title?: HeaderButtonWithMenuProps['title']
  children?: React.ReactNode

  // Clicks
  href?: string
  onClick?: NavItemClickFunction

  // Custom
  hideInMobileDrawer?: boolean
  showOnMobileBar?: boolean
  offsetLeft?: boolean
  preset?: {
    type: 'logo' | 'search'
  } & Record<string, unknown> // NavItemSearchPreset
  render?: (renderProps: any) => React.ReactNode
}

export interface HeaderProps extends AppBarProps, WithPaletteModeProps {
  accordionProps?: Omit<NavAccordionProps, 'title'>
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
  disableRightDrawer?: boolean
  announcements?: Array<{ title: string }>
  height?: number
  drawerWidth?: BoxProps['width']
  textColor?: string
  /**
   * The scroll position at which the header will become translucent instead.
   */
  translucentAtScrollY?: number
  invertLogo?: boolean
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
  ({ invertLogo, translucentAtScrollY, isTranslucentAtScrollY }) =>
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
  navItem: HeaderNavItem
  boxProps?: BoxProps
  isMobile?: boolean
}) => {
  const { navItem, boxProps, isMobile } = props
  const { preset } = navItem
  const { type, ...presetProps } = preset

  switch (type) {
    case 'logo':
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
            // Ensure that the box is stretched out vertically
            height: '100%',
            // Adds a gutter between the logo and other navItems
            px: 2,
            // Offset margin left against the px
            ml: -2,
            // Hover effects
            '&:hover': { backgroundColor: 'action.hover' },
            // Mobile props
            ...(isMobile && { py: 1, px: 3 }),
            // Rest
            ...boxProps?.sx,
            // Overwrite to ensure that logo is always shown
            display: 'flex',
          }}
        >
          {logoChildrenJsx}
        </Box>
      )
    case 'search':
      return <HeaderSearch {...(presetProps as unknown as HeaderSearchProps)} />
    default:
      return null
  }
}
const renderNavItems = (navItems, props) => {
  const { router, renderProps } = props

  if (
    !navItems ||
    !Array.isArray(navItems) ||
    navItems.filter(Boolean).length === 0
  )
    return null

  return navItems.filter(Boolean).map((navItem: HeaderNavItem, i) => {
    const {
      key: injectedKey,
      children,
      showOnMobileBar,
      offsetLeft,
      preset,
      render,
      sx,
    } = navItem

    if (!navItem) return null

    const key = injectedKey || `nav-item-${i}`

    // Get classes
    const boxProps = {
      key,
      component: 'div' as const,
      alignItems: 'center',
      sx: {
        display: { xs: 'none', md: 'flex' },
        '& > button': { whiteSpace: 'nowrap' },
        ...(showOnMobileBar && { display: 'flex' }),
        ...(offsetLeft && { ml: -2 }),
        ...sx,
      },
    }

    switch (true) {
      // Render with renderProps to access state
      case typeof render === 'function':
        return <Box {...boxProps}>{render({ ...renderProps, navItem })}</Box>
      // Render children override
      case Boolean(children):
        return <Box {...boxProps}>{children}</Box>
      // Render presets
      case Boolean(preset):
        return renderNavItemPreset({ navItem, boxProps })
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
              p: 1.5,
              borderRadius: 0,
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
  })
}
const renderMobileNavItems = (navItems, props) => {
  const { closeDrawer, accordionProps, isGroupedNavItems } = props

  const mobileNavItems = (
    isGroupedNavItems ? getCombinedMobileNavItems(navItems) : navItems
  ).filter(Boolean)

  return mobileNavItems.map((navItem, i) => {
    // Omit redundant props
    const {
      key: injectedKey,
      onClick: injectedOnClick,
      preset,
      isOpenOnHover,
      renderItems,
      fullWidth,
      hideInMobileDrawer,
      showOnMobileBar,
      ...accordionLinksNavItem
    } = navItem

    const key = injectedKey || `mobile-nav-item-${i}`
    const boxProps = {
      key,
      component: 'div' as const,
      alignItems: 'center',
      sx: { display: 'flex', ...navItem.sx },
    }

    // Render
    switch (true) {
      case Boolean(preset):
        return (
          <React.Fragment key={key}>
            {renderNavItemPreset({
              navItem,
              boxProps,
              isMobile: true,
            })}
          </React.Fragment>
        )
      default:
        return (
          <NavAccordion
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
    containerProps,
    center,
    disableScrollTrigger,
    disableSticky,
    disableRightDrawer,
    drawerWidth = 320,
    navItems: injectedNavItems,
    accordionProps,
    renderProps,
    announcements,
    toolbarProps,
    height,
    mode,
    dark,
    sx,
    textColor = 'text.primary',
    translucentAtScrollY,
    invertLogo,
    ...rest
  } = props

  // Router
  const router = useRouter()

  // State
  const [isDrawerOpen, { open: openDrawer, close: closeDrawer }] =
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
  }, [router.asPath, isDesktop])

  // Convert transparent header to translucent after initial height
  const scrollY = useScrollPosition(60 /* 60 fps */)
  const isTranslucentAtScrollY = scrollY >= translucentAtScrollY

  // Process navItems (desktop) and mobileNavItems
  const navItems = flowRight(
    withInvertLogoInNavItems({
      invertLogo,
      translucentAtScrollY,
      isTranslucentAtScrollY,
    })
  )(injectedNavItems)
  const mobileNavItems = injectedNavItems

  // Grouped navItems
  const isGroupedNavItems =
    typeof navItems === 'object' && !Array.isArray(navItems)
  const hasNavItemCenterGroup = isGroupedNavItems && 'center' in navItems
  const navItemGroupSx = { display: 'flex', alignItems: 'stretch' }
  const renderNavItemsProps = {
    ...props,

    // Router
    router,

    // Drawer
    isDrawerOpen,
    openDrawer,
    closeDrawer,

    // Grouped
    isGroupedNavItems,
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
          transparent: false,
          translucent: true,
        }),
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
                edge="end"
                color="inherit"
                aria-label="menu"
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
          anchor="right"
          open={isDrawerOpen}
          onOpen={openDrawer}
          onClose={closeDrawer}
        >
          <Box
            width={drawerWidth}
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
              {renderMobileNavItems(mobileNavItems, renderNavItemsProps)}
            </List>
          </Box>
        </SwipeableDrawer>
      )}
    </AppBar>
  )

  const childrenWithLayoutJsx = (
    <>
      {Boolean(announcements?.length) && (
        <Box
          sx={{
            py: 0.5,
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            textAlign: 'center',
          }}
        >
          <Container {...containerProps}>
            {announcements[0] && (
              <Typography variant="subtitle2" color="inherit">
                {announcements[0]?.title}
              </Typography>
            )}
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

  return withPaletteMode({
    mode,
    dark,
  })(childrenWithLayoutJsx)
}

export default Header
