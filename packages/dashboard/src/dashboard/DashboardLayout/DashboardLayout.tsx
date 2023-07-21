import React, { ReactNode, useEffect, useState } from 'react'
import { SxProps, Theme, useMediaQuery, useTheme } from '@mui/material'
import {
  ResponsiveDrawer,
  ResponsiveDrawerProps,
  Box,
  List,
  ListItemProps,
  ListProps,
  BoxProps,
  Breadcrumbs,
  BreadcrumbsProps,
  Typography,
  TypographyProps,
} from '@gravis-os/ui'
import { useRouter } from 'next/router'
import NextNProgress from 'nextjs-progressbar'
import dashboardLayoutConfig from './dashboardLayoutConfig'
import DashboardLayoutHeader, {
  DashboardLayoutHeaderProps,
} from './DashboardLayoutHeader'
import getListItemsWithActiveStateFromRouter from './getListItemsWithActiveStateFromRouter'
import getAsideWidth from './getAsideWidth'

const {
  miniVariantWidth: defaultMiniVariantWidth,
  secondaryMiniVariantWidth,
  headerHeight: defaultHeaderHeight,
  primaryLeftAsideItemMinHeight,
} = dashboardLayoutConfig

export interface DashboardLayoutProps {
  // Default states
  defaultLeftAsideOpen?: boolean
  defaultSecondaryLeftAsideOpen?: boolean
  defaultRightAsideOpen?: boolean

  // Disables
  disablePadding?: boolean
  disableGutters?: boolean
  disableResponsiveCollapse?: boolean
  disableLeftAsideToggleButton?: boolean

  // Minivariant
  isMiniVariant?: boolean
  miniVariantWidth?: number
  disableClipUnderAppBar?: boolean

  // Dark mode
  darkLeftAside?: boolean
  darkSecondaryLeftAside?: boolean

  // Left Aside Props
  leftAsideWidth?: number
  leftAsideListProps?: Omit<ListProps, 'items' | 'listItemProps'>
  leftAsideListItems?: ListItemProps['items']
  leftAsideListItemProps?: Omit<ListItemProps, 'key'>
  leftAsideDrawerProps?: Omit<ResponsiveDrawerProps, 'width'>
  leftAsideBottomActions?: ReactNode | ReactNode[]
  leftAsideMiniVariantPersistClosedState?: boolean

  // Secondary Left Aside Props
  showSecondaryLeftAside?: boolean
  secondaryLeftAsideWidth?: number
  secondaryLeftAsideListProps?: Omit<ListProps, 'items' | 'listItemProps'>
  secondaryLeftAsideListItemProps?: Omit<ListItemProps, 'key'>
  secondaryLeftAsideDrawerProps?: Omit<ResponsiveDrawerProps, 'width'>

  // Right Aside
  rightAside?: React.ReactNode
  rightAsideListItems?: ListItemProps['items']
  rightAsideWidth?: number
  rightAsideOpen?: boolean
  disableRightAside?: boolean
  setRightAsideOpen?: React.Dispatch<React.SetStateAction<boolean>>

  // Header
  headerProps?: DashboardLayoutHeaderProps
  headerHeight?: number
  showHeaderLeftMenuToggle?: boolean

  // Other elements
  children?: React.ReactNode
  sx?: BoxProps['sx']

  // Hero
  title?: React.ReactNode
  titleProps?: TypographyProps
  breadcrumbs?: BreadcrumbsProps['items']
  breadcrumbsProps?: BreadcrumbsProps
}

const DashboardLayout: React.FC<DashboardLayoutProps> = (props) => {
  const {
    children,
    disableGutters,
    disablePadding,
    isMiniVariant: injectedIsMiniVariant,
    miniVariantWidth: injectedMiniVariantWidth,
    disableClipUnderAppBar,
    disableResponsiveCollapse,
    disableLeftAsideToggleButton,

    // Header
    showHeaderLeftMenuToggle = false,
    headerProps,

    defaultLeftAsideOpen: injectedDefaultLeftAsideOpen = true,
    defaultSecondaryLeftAsideOpen = false,

    // Left Aside
    leftAsideWidth = dashboardLayoutConfig.leftAsideWidth,
    leftAsideListProps,
    leftAsideListItems: injectedLeftAsideListItems,
    leftAsideListItemProps,
    leftAsideDrawerProps,
    leftAsideBottomActions,
    leftAsideMiniVariantPersistClosedState = false,
    darkLeftAside,

    // Left Secondary Aside
    secondaryLeftAsideWidth = dashboardLayoutConfig.leftAsideWidth,
    secondaryLeftAsideListProps,
    showSecondaryLeftAside,
    secondaryLeftAsideListItemProps,
    secondaryLeftAsideDrawerProps,
    darkSecondaryLeftAside,

    // Right Aside
    rightAside,
    disableRightAside,
    defaultRightAsideOpen = false,
    rightAsideOpen: injectedRightAsideOpen,
    setRightAsideOpen: injectedSetRightAsideOpen,
    rightAsideWidth = dashboardLayoutConfig.rightAsideWidth,
    rightAsideListItems,

    headerHeight: injectedHeaderHeight,
    sx,

    // Hero
    breadcrumbs,
    breadcrumbsProps,
    title,
    titleProps,
  } = props

  // Router
  const router = useRouter()
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true })

  // List Items
  const leftAsideListItems = getListItemsWithActiveStateFromRouter(
    injectedLeftAsideListItems,
    router
  )
  const primaryLeftAsideListItems =
    isDesktop && showSecondaryLeftAside
      ? // Not to show nested List Items if showSecondaryLeftAside=true
        leftAsideListItems?.map(({ items, ...listItem }) => listItem)
      : leftAsideListItems
  const { items: secondaryLeftAsideListItems } =
    leftAsideListItems?.find(({ selected }) => selected) || {}

  const hasPrimaryLeftAsideListItems = Boolean(
    primaryLeftAsideListItems?.length
  )

  const defaultLeftAsideOpen = Boolean(
    hasPrimaryLeftAsideListItems && injectedDefaultLeftAsideOpen
  )

  // States
  const [leftAsideOpen, setLeftAsideOpen] = useState(defaultLeftAsideOpen)
  const [secondaryLeftAsideOpen, setSecondaryLeftAsideOpen] = useState(
    defaultSecondaryLeftAsideOpen
  )
  const [localRightAsideOpen, setLocalRightAsideOpen] = useState(
    defaultRightAsideOpen
  )
  const rightAsideOpen =
    typeof injectedRightAsideOpen !== 'undefined'
      ? injectedRightAsideOpen
      : localRightAsideOpen
  const setRightAsideOpen =
    typeof injectedSetRightAsideOpen !== 'undefined'
      ? injectedSetRightAsideOpen
      : setLocalRightAsideOpen

  // Collapse asides below desktop breakpoint
  // Effects
  useEffect(() => {
    if (!isDesktop && !disableResponsiveCollapse) {
      setLeftAsideOpen(false)
      setSecondaryLeftAsideOpen(false)
      setRightAsideOpen(false)
    }
  }, [isDesktop])

  // Booleans
  // MiniVariant is to be applied from desktop viewport onwards
  const isMiniVariant = isDesktop && injectedIsMiniVariant
  const miniVariantWidth = injectedMiniVariantWidth ?? defaultMiniVariantWidth
  const hasSecondaryLeftAside = Boolean(
    isDesktop && showSecondaryLeftAside && secondaryLeftAsideListItems?.length
  )
  const isLeftAsideOpen = leftAsideOpen
  const isSecondaryLeftAsideOpen = secondaryLeftAsideOpen
  const isRightAsideOpen = rightAsideOpen
  const isMiniVariantLeftAsideClosed = Boolean(
    isMiniVariant && !isLeftAsideOpen
  )
  const isSecondaryMiniVariantLeftAsideClosed =
    hasSecondaryLeftAside && !isSecondaryLeftAsideOpen
  const headerHeight = injectedHeaderHeight ?? defaultHeaderHeight

  // Calculated
  const totalLeftAsideWidth = getAsideWidth({
    primaryAsideWidth: leftAsideWidth,
    secondaryAsideWidth: secondaryLeftAsideWidth,
    miniVariantWidth,
    secondaryMiniVariantWidth,
    isPrimaryAsideOpen: isLeftAsideOpen,
    isSecondaryAsideOpen: isSecondaryLeftAsideOpen,
    isMiniVariant,
    hasSecondaryLeftAside,
  })

  const layoutProps = {
    leftAsideOpen,
    setLeftAsideOpen,
    isLeftAsideOpen,

    secondaryLeftAsideOpen,
    setSecondaryLeftAsideOpen,
    isSecondaryLeftAsideOpen,

    rightAsideOpen,
    setRightAsideOpen,
    isRightAsideOpen,
  }

  // Styling
  const responsiveDrawerSx: SxProps<Theme> = {
    overflowX: 'hidden',
    transition: theme.transitions.create(['width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }

  return (
    <Box display="flex">
      <NextNProgress />

      {/* Header */}
      <DashboardLayoutHeader
        height={headerHeight}
        showLeftMenuToggle={
          hasPrimaryLeftAsideListItems && showHeaderLeftMenuToggle
        }
        {...headerProps}
        renderProps={layoutProps}
        sx={{
          ...(disableClipUnderAppBar && {
            left: { md: totalLeftAsideWidth },
            width: { md: `calc(100% - ${totalLeftAsideWidth}px)` },
            transition: theme.transitions.create(['left', 'width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }),
          ...headerProps?.sx,
        }}
      />

      {/* Body */}
      <Box
        sx={{
          // Left aside offset to prevent overflowX
          ml: { md: `${totalLeftAsideWidth}px` },
          width: { md: `calc(100% - ${totalLeftAsideWidth}px)` },

          zIndex: (theme) => theme.zIndex.appBar - 1,
          display: 'flex',
          flex: '1 1 auto',
          maxWidth: '100%',
          marginTop: `${
            headerHeight + (disablePadding || disableGutters ? 0 : 24)
          }px`,

          // Right drawer
          ...(Boolean(rightAside || rightAsideListItems?.length) &&
            !disableRightAside &&
            isRightAsideOpen && { mr: { md: `${rightAsideWidth}px` } }),

          // Animations
          transition: theme.transitions.create(['margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),

          ...sx,
        }}
      >
        {/* Secondary Left Aside */}
        {hasSecondaryLeftAside && (
          <ResponsiveDrawer
            {...secondaryLeftAsideDrawerProps}
            dark={darkSecondaryLeftAside}
            width={secondaryLeftAsideWidth}
            sx={{
              ...responsiveDrawerSx,
              ...secondaryLeftAsideDrawerProps?.sx,
              marginTop: {
                // eslint-disable-next-line no-nested-ternary
                xs: isSecondaryMiniVariantLeftAsideClosed
                  ? disableClipUnderAppBar
                    ? 0
                    : `${headerHeight}px`
                  : 0,
                sm: disableClipUnderAppBar ? 0 : `${headerHeight}px`,
              },
            }}
            open={isSecondaryLeftAsideOpen}
            onOpen={() => setSecondaryLeftAsideOpen(true)}
            onClose={() => setSecondaryLeftAsideOpen(false)}
            desktopDrawerProps={{
              ...secondaryLeftAsideDrawerProps?.desktopDrawerProps,
              variant: 'persistent',
              PaperProps: {
                sx: {
                  // eslint-disable-next-line no-nested-ternary
                  left: isLeftAsideOpen
                    ? leftAsideWidth
                    : isMiniVariant
                    ? miniVariantWidth
                    : 0,
                  transition: theme.transitions.create(['left'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                  }),
                },
              },
            }}
            showToggleBar
            toggleBarBoxProps={{
              left:
                // eslint-disable-next-line no-nested-ternary
                (isLeftAsideOpen
                  ? leftAsideWidth
                  : isMiniVariant
                  ? miniVariantWidth
                  : 0) +
                (isSecondaryLeftAsideOpen ? secondaryLeftAsideWidth : 0),
            }}
          >
            <List
              {...secondaryLeftAsideListProps}
              items={secondaryLeftAsideListItems}
              listItemProps={{
                disableGutters: true,
                hasTooltip: isSecondaryMiniVariantLeftAsideClosed,
                disableText: isSecondaryMiniVariantLeftAsideClosed,
                textProps: {
                  primaryTypographyProps: { variant: 'subtitle2' },
                },
                buttonProps: {
                  sx: {
                    flexShrink: 0,
                    px: 2.5,
                  },
                  ...(isSecondaryMiniVariantLeftAsideClosed && {
                    onClick: () => setSecondaryLeftAsideOpen(true),
                  }),
                },
                collapseProps: {
                  sx: {
                    ...(isSecondaryMiniVariantLeftAsideClosed && {
                      display: 'none',
                    }),
                  },
                },
                ...secondaryLeftAsideListItemProps,
              }}
            />
          </ResponsiveDrawer>
        )}

        {/* Primary Left Aside */}
        <ResponsiveDrawer
          showToggleButton={
            !disableLeftAsideToggleButton && hasPrimaryLeftAsideListItems
          }
          {...leftAsideDrawerProps}
          dark={darkLeftAside}
          width={
            // eslint-disable-next-line no-nested-ternary
            isMiniVariant
              ? isLeftAsideOpen
                ? leftAsideWidth
                : miniVariantWidth
              : leftAsideWidth
          }
          sx={{
            ...responsiveDrawerSx,
            ...leftAsideDrawerProps?.sx,
            marginTop: {
              // eslint-disable-next-line no-nested-ternary
              xs: isMiniVariantLeftAsideClosed
                ? disableClipUnderAppBar
                  ? 0
                  : `${headerHeight}px`
                : 0,
              sm: disableClipUnderAppBar ? 0 : `${headerHeight}px`,
            },
          }}
          open={isLeftAsideOpen}
          onOpen={() => setLeftAsideOpen(true)}
          onClose={() => setLeftAsideOpen(false)}
          desktopDrawerProps={{
            ...leftAsideDrawerProps?.desktopDrawerProps,
            variant: isMiniVariant ? 'permanent' : 'persistent',
          }}
        >
          {hasPrimaryLeftAsideListItems && (
            <List
              {...leftAsideListProps}
              items={primaryLeftAsideListItems}
              listItemProps={{
                disableGutters: true,
                hasTooltip: isMiniVariantLeftAsideClosed,
                disableText: isMiniVariantLeftAsideClosed,
                textProps: { primaryTypographyProps: { variant: 'subtitle2' } },
                buttonProps: {
                  sx: {
                    ...(isMiniVariant && { flexShrink: 0, px: 2.5 }),
                    // Min-height on primary left aside items
                    minHeight: primaryLeftAsideItemMinHeight,
                  },

                  // Make first click on mini-variant open the drawer instead of routing
                  ...(isMiniVariantLeftAsideClosed &&
                    !leftAsideMiniVariantPersistClosedState && {
                      onClick: (e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        setLeftAsideOpen(true)
                      },
                    }),
                },
                collapseProps: {
                  sx: {
                    ...(isMiniVariantLeftAsideClosed && {
                      display: 'none',
                    }),
                  },
                },
                ...leftAsideListItemProps,
              }}
              sx={{
                marginBottom: {
                  // eslint-disable-next-line no-nested-ternary
                  xs: isMiniVariantLeftAsideClosed
                    ? disableClipUnderAppBar
                      ? 0
                      : `${headerHeight}px`
                    : 0,
                  sm: disableClipUnderAppBar ? 0 : `${headerHeight}px`,
                },
                ...leftAsideListProps?.sx,
              }}
            />
          )}

          {leftAsideBottomActions}
        </ResponsiveDrawer>

        {/* Main */}
        <Box
          component="main"
          sx={{
            width: '100%',
            flexGrow: 1,
            ...(!disablePadding && { p: 3 }),
            ...(disableGutters && { px: 0 }), // Remove horizontal padding
          }}
        >
          {/* Hero */}
          {(title || breadcrumbs) && (
            <Box sx={{ p: 2 }}>
              <Breadcrumbs items={breadcrumbs} {...breadcrumbsProps} />
              {title && (
                <Typography variant="h1" {...titleProps}>
                  {title}
                </Typography>
              )}
            </Box>
          )}

          {/* Children */}
          {children}
        </Box>

        {/* Right Aside */}
        {!disableRightAside && (
          <ResponsiveDrawer
            anchor="right"
            width={rightAsideWidth}
            open={isRightAsideOpen}
            onClose={() => setRightAsideOpen(false)}
            sx={{ marginTop: `${headerHeight}px` }}
          >
            {rightAside}
            {Boolean(rightAsideListItems?.length) && (
              <List
                dense
                items={rightAsideListItems.map((item) => ({
                  ...item,
                  disableGutters: true,
                }))}
              />
            )}
          </ResponsiveDrawer>
        )}
      </Box>
    </Box>
  )
}

export default DashboardLayout
