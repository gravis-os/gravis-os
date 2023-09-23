import React, { ReactNode, useEffect, useState } from 'react'

import {
  Box,
  BoxProps,
  Breadcrumbs,
  BreadcrumbsProps,
  List,
  ListItemProps,
  ListProps,
  ResponsiveDrawer,
  ResponsiveDrawerProps,
  Typography,
  TypographyProps,
} from '@gravis-os/ui'
import { SxProps, Theme, useMediaQuery, useTheme } from '@mui/material'
import { useRouter } from 'next/router'
import NextNProgress from 'nextjs-progressbar'

import dashboardLayoutConfig from './dashboardLayoutConfig'
import DashboardLayoutHeader, {
  DashboardLayoutHeaderProps,
} from './DashboardLayoutHeader'
import getAsideWidth from './getAsideWidth'
import getListItemsWithActiveStateFromRouter from './getListItemsWithActiveStateFromRouter'

const {
  headerHeight: defaultHeaderHeight,
  miniVariantWidth: defaultMiniVariantWidth,
  primaryLeftAsideItemMinHeight,
  secondaryMiniVariantWidth,
} = dashboardLayoutConfig

export interface DashboardLayoutProps {
  breadcrumbs?: BreadcrumbsProps['items']
  breadcrumbsProps?: BreadcrumbsProps
  // Other elements
  children?: React.ReactNode

  // Dark mode
  darkLeftAside?: boolean
  darkSecondaryLeftAside?: boolean
  // Default states
  defaultLeftAsideOpen?: boolean
  defaultRightAsideOpen?: boolean

  defaultSecondaryLeftAsideOpen?: boolean
  disableClipUnderAppBar?: boolean
  disableGutters?: boolean

  disableLeftAsideToggleButton?: boolean
  // Disables
  disablePadding?: boolean

  disableResponsiveCollapse?: boolean
  disableRightAside?: boolean
  headerHeight?: number
  // Header
  headerProps?: DashboardLayoutHeaderProps
  // Minivariant
  isMiniVariant?: boolean
  leftAsideBottomActions?: ReactNode | ReactNode[]
  leftAsideDrawerProps?: Omit<ResponsiveDrawerProps, 'width'>

  leftAsideListItemProps?: Omit<ListItemProps, 'key'>
  leftAsideListItems?: ListItemProps['items']
  leftAsideListProps?: Omit<ListProps, 'items' | 'listItemProps'>
  leftAsideMiniVariantPersistClosedState?: boolean
  // Left Aside Props
  leftAsideWidth?: number

  miniVariantWidth?: number
  // Right Aside
  rightAside?: React.ReactNode
  rightAsideListItems?: ListItemProps['items']
  rightAsideOpen?: boolean
  rightAsideWidth?: number
  secondaryLeftAsideDrawerProps?: Omit<ResponsiveDrawerProps, 'width'>

  secondaryLeftAsideListItemProps?: Omit<ListItemProps, 'key'>
  secondaryLeftAsideListProps?: Omit<ListProps, 'items' | 'listItemProps'>
  secondaryLeftAsideWidth?: number

  setRightAsideOpen?: React.Dispatch<React.SetStateAction<boolean>>
  showHeaderLeftMenuToggle?: boolean

  // Secondary Left Aside Props
  showSecondaryLeftAside?: boolean
  sx?: BoxProps['sx']
  // Hero
  title?: React.ReactNode
  titleProps?: TypographyProps
}

const DashboardLayout: React.FC<DashboardLayoutProps> = (props) => {
  const {
    title,
    // Hero
    breadcrumbs,
    breadcrumbsProps,
    children,
    darkLeftAside,
    darkSecondaryLeftAside,
    defaultLeftAsideOpen: injectedDefaultLeftAsideOpen = true,
    defaultRightAsideOpen = false,

    defaultSecondaryLeftAsideOpen = false,
    disableClipUnderAppBar,

    disableGutters,
    disableLeftAsideToggleButton,

    disablePadding,
    disableResponsiveCollapse,
    disableRightAside,
    headerHeight: injectedHeaderHeight,
    headerProps,
    isMiniVariant: injectedIsMiniVariant,
    leftAsideBottomActions,
    leftAsideDrawerProps,

    leftAsideListItemProps,
    leftAsideListItems: injectedLeftAsideListItems,
    leftAsideListProps,
    leftAsideMiniVariantPersistClosedState = false,
    // Left Aside
    leftAsideWidth = dashboardLayoutConfig.leftAsideWidth,
    miniVariantWidth: injectedMiniVariantWidth,

    // Right Aside
    rightAside,
    rightAsideListItems,
    rightAsideOpen: injectedRightAsideOpen,
    rightAsideWidth = dashboardLayoutConfig.rightAsideWidth,
    secondaryLeftAsideDrawerProps,
    secondaryLeftAsideListItemProps,
    secondaryLeftAsideListProps,

    // Left Secondary Aside
    secondaryLeftAsideWidth = dashboardLayoutConfig.leftAsideWidth,
    setRightAsideOpen: injectedSetRightAsideOpen,

    // Header
    showHeaderLeftMenuToggle = false,
    showSecondaryLeftAside,
    sx,
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
    injectedRightAsideOpen === undefined
      ? localRightAsideOpen
      : injectedRightAsideOpen
  const setRightAsideOpen =
    injectedSetRightAsideOpen === undefined
      ? setLocalRightAsideOpen
      : injectedSetRightAsideOpen

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
    hasSecondaryLeftAside,
    isMiniVariant,
    isPrimaryAsideOpen: isLeftAsideOpen,
    isSecondaryAsideOpen: isSecondaryLeftAsideOpen,
    miniVariantWidth,
    primaryAsideWidth: leftAsideWidth,
    secondaryAsideWidth: secondaryLeftAsideWidth,
    secondaryMiniVariantWidth,
  })

  const layoutProps = {
    isLeftAsideOpen,
    isRightAsideOpen,
    isSecondaryLeftAsideOpen,

    leftAsideOpen,
    rightAsideOpen,
    secondaryLeftAsideOpen,

    setLeftAsideOpen,
    setRightAsideOpen,
    setSecondaryLeftAsideOpen,
  }

  // Styling
  const responsiveDrawerSx: SxProps<Theme> = {
    overflowX: 'hidden',
    transition: theme.transitions.create(['width'], {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
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
            transition: theme.transitions.create(['left', 'width'], {
              duration: theme.transitions.duration.leavingScreen,
              easing: theme.transitions.easing.sharp,
            }),
            width: { md: `calc(100% - ${totalLeftAsideWidth}px)` },
          }),
          ...headerProps?.sx,
        }}
      />

      {/* Body */}
      <Box
        sx={{
          display: 'flex',
          flex: '1 1 auto',

          marginTop: `${
            headerHeight + (disablePadding || disableGutters ? 0 : 24)
          }px`,
          maxWidth: '100%',
          // Left aside offset to prevent overflowX
          ml: { md: `${totalLeftAsideWidth}px` },
          width: { md: `calc(100% - ${totalLeftAsideWidth}px)` },
          zIndex: (theme) => theme.zIndex.appBar - 1,

          // Right drawer
          ...(Boolean(rightAside || rightAsideListItems?.length) &&
            !disableRightAside &&
            isRightAsideOpen && { mr: { md: `${rightAsideWidth}px` } }),

          // Animations
          transition: theme.transitions.create(['margin'], {
            duration: theme.transitions.duration.leavingScreen,
            easing: theme.transitions.easing.sharp,
          }),

          ...sx,
        }}
      >
        {/* Secondary Left Aside */}
        {hasSecondaryLeftAside && (
          <ResponsiveDrawer
            {...secondaryLeftAsideDrawerProps}
            dark={darkSecondaryLeftAside}
            desktopDrawerProps={{
              ...secondaryLeftAsideDrawerProps?.desktopDrawerProps,
              PaperProps: {
                sx: {
                  // prettier-ignore
                  left: isLeftAsideOpen
                    ? leftAsideWidth
                    : (isMiniVariant
                    ? miniVariantWidth
                    : 0),
                  transition: theme.transitions.create(['left'], {
                    duration: theme.transitions.duration.leavingScreen,
                    easing: theme.transitions.easing.sharp,
                  }),
                },
              },
              variant: 'persistent',
            }}
            onClose={() => setSecondaryLeftAsideOpen(false)}
            onOpen={() => setSecondaryLeftAsideOpen(true)}
            open={isSecondaryLeftAsideOpen}
            showToggleBar
            sx={{
              ...responsiveDrawerSx,
              ...secondaryLeftAsideDrawerProps?.sx,
              marginTop: {
                // prettier-ignore
                xs: isSecondaryMiniVariantLeftAsideClosed
                  ? (disableClipUnderAppBar
                    ? 0
                    : `${headerHeight}px`)
                  : 0,
                sm: disableClipUnderAppBar ? 0 : `${headerHeight}px`,
              },
            }}
            toggleBarBoxProps={{
              left:
                // prettier-ignore
                (isLeftAsideOpen
                  ? leftAsideWidth
                  : (isMiniVariant
                  ? miniVariantWidth
                  : 0)) +
                (isSecondaryLeftAsideOpen ? secondaryLeftAsideWidth : 0),
            }}
            width={secondaryLeftAsideWidth}
          >
            <List
              {...secondaryLeftAsideListProps}
              items={secondaryLeftAsideListItems}
              listItemProps={{
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
                disableGutters: true,
                disableText: isSecondaryMiniVariantLeftAsideClosed,
                hasTooltip: isSecondaryMiniVariantLeftAsideClosed,
                textProps: {
                  primaryTypographyProps: { variant: 'subtitle2' },
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
          desktopDrawerProps={{
            ...leftAsideDrawerProps?.desktopDrawerProps,
            variant: isMiniVariant ? 'permanent' : 'persistent',
          }}
          onClose={() => setLeftAsideOpen(false)}
          onOpen={() => setLeftAsideOpen(true)}
          open={isLeftAsideOpen}
          sx={{
            ...responsiveDrawerSx,
            ...leftAsideDrawerProps?.sx,
            marginTop: {
              // prettier-ignore
              xs: isMiniVariantLeftAsideClosed
                ? (disableClipUnderAppBar
                  ? 0
                  : `${headerHeight}px`)
                : 0,
              sm: disableClipUnderAppBar ? 0 : `${headerHeight}px`,
            },
          }}
          width={
            // prettier-ignore
            isMiniVariant
              ? (isLeftAsideOpen
                ? leftAsideWidth
                : miniVariantWidth)
              : leftAsideWidth
          }
        >
          {hasPrimaryLeftAsideListItems && (
            <List
              {...leftAsideListProps}
              items={primaryLeftAsideListItems}
              listItemProps={{
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
                disableGutters: true,
                disableText: isMiniVariantLeftAsideClosed,
                hasTooltip: isMiniVariantLeftAsideClosed,
                textProps: { primaryTypographyProps: { variant: 'subtitle2' } },
                ...leftAsideListItemProps,
              }}
              sx={{
                marginBottom: {
                  // prettier-ignore
                  xs: isMiniVariantLeftAsideClosed
                    ? (disableClipUnderAppBar
                      ? 0
                      : `${headerHeight}px`)
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
            flexGrow: 1,
            width: '100%',
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
            onClose={() => setRightAsideOpen(false)}
            open={isRightAsideOpen}
            sx={{ marginTop: `${headerHeight}px` }}
            width={rightAsideWidth}
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
