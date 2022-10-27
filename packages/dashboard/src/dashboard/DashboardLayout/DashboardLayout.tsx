import React, { useEffect, useState } from 'react'
import { SxProps, Theme, useMediaQuery, useTheme } from '@mui/material'
import { Box, List, ListItemProps, ListProps } from '@gravis-os/ui'
import { useRouter } from 'next/router'
import dashboardLayoutConfig from './dashboardLayoutConfig'
import ResponsiveDrawer, { ResponsiveDrawerProps } from './ResponsiveDrawer'
import DashboardLayoutHeader, {
  DashboardLayoutHeaderProps,
} from './DashboardLayoutHeader'
import getListItemsWithActiveStateFromRouter from './getListItemsWithActiveStateFromRouter'
import getAsideWidth from './getAsideWidth'

const { miniVariantWidth, secondaryMiniVariantWidth, headerHeight } =
  dashboardLayoutConfig

export interface DashboardLayoutProps {
  // Default states
  defaultLeftAsideOpen?: boolean
  defaultSecondaryLeftAsideOpen?: boolean
  defaultRightAsideOpen?: boolean

  // Disables
  disablePadding?: boolean
  disableGutters?: boolean

  // Minivariant
  isMiniVariant?: boolean
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

  // Secondary Left Aside Props
  showSecondaryLeftAside?: boolean
  secondaryLeftAsideWidth?: number
  secondaryLeftAsideListProps?: Omit<ListProps, 'items' | 'listItemProps'>
  secondaryLeftAsideListItemProps?: Omit<ListItemProps, 'key'>
  secondaryLeftAsideDrawerProps?: Omit<ResponsiveDrawerProps, 'width'>

  // Right Aside
  rightAsideListItems?: ListItemProps['items']
  rightAsideWidth?: number

  // Other elements
  disableHeaderMenuToggleOnMobile?: boolean
  headerProps?: DashboardLayoutHeaderProps
  children?: React.ReactNode
}

const DashboardLayout: React.FC<DashboardLayoutProps> = (props) => {
  const {
    children,
    disableGutters,
    disablePadding,
    isMiniVariant: injectedIsMiniVariant,
    disableClipUnderAppBar,
    headerProps,
    disableHeaderMenuToggleOnMobile,

    defaultLeftAsideOpen = true,
    defaultSecondaryLeftAsideOpen = false,
    defaultRightAsideOpen = true,

    leftAsideWidth = dashboardLayoutConfig.leftAsideWidth,
    secondaryLeftAsideWidth = dashboardLayoutConfig.leftAsideWidth,
    rightAsideWidth = dashboardLayoutConfig.rightAsideWidth,

    leftAsideListProps,
    secondaryLeftAsideListProps,

    leftAsideListItems: injectedLeftAsideListItems,
    rightAsideListItems,

    showSecondaryLeftAside,

    leftAsideListItemProps,
    secondaryLeftAsideListItemProps,

    leftAsideDrawerProps,
    secondaryLeftAsideDrawerProps,

    darkLeftAside,
    darkSecondaryLeftAside,
  } = props

  // States
  const [leftAsideOpen, setLeftAsideOpen] = useState(defaultLeftAsideOpen)
  const [secondaryLeftAsideOpen, setSecondaryLeftAsideOpen] = useState(
    defaultSecondaryLeftAsideOpen
  )
  const [rightAsideOpen, setRightAsideOpen] = useState(defaultRightAsideOpen)

  // Router
  const router = useRouter()

  // Effects
  // Collapse asides below desktop breakpoint
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true })
  useEffect(() => {
    if (!isDesktop) {
      setLeftAsideOpen(false)
      setSecondaryLeftAsideOpen(false)
      setRightAsideOpen(false)
    }
  }, [isDesktop])

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

  // Booleans
  // MiniVariant is to be applied from desktop viewport onwards
  const isMiniVariant = isDesktop && injectedIsMiniVariant
  const hasSecondaryLeftAside = Boolean(
    isDesktop && showSecondaryLeftAside && secondaryLeftAsideListItems?.length
  )
  const isLeftAsideOpen = leftAsideOpen
  const isSecondaryLeftAsideOpen = secondaryLeftAsideOpen
  const isRightAsideOpen = rightAsideOpen
  const isMiniVariantLeftAsideClosed = isMiniVariant && !isLeftAsideOpen
  const isSecondaryMiniVariantLeftAsideClosed =
    hasSecondaryLeftAside && !isSecondaryLeftAsideOpen

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
  const listItemTextSx: SxProps<Theme> = {
    opacity: 0,
    transition: theme.transitions.create(['opacity'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }
  const responsiveDrawerSx: SxProps<Theme> = {
    overflowX: 'hidden',
    transition: theme.transitions.create(['width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }

  return (
    <Box display="flex">
      {/* Header */}
      <DashboardLayoutHeader
        hideLeftAsideMenuToggle={isDesktop && disableHeaderMenuToggleOnMobile}
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
          zIndex: (theme) => theme.zIndex.appBar - 1,
          display: 'flex',
          flex: '1 1 auto',
          maxWidth: '100%',
          marginTop: `${
            headerHeight + (disablePadding || disableGutters ? 0 : 24)
          }px`,

          // Left aside
          ml: { md: `${totalLeftAsideWidth}px` },

          // Right drawer
          ...(Boolean(rightAsideListItems?.length) &&
            isRightAsideOpen && { mr: { md: `${rightAsideWidth}px` } }),

          // Animations
          transition: theme.transitions.create(['margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
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
                textProps: {
                  primaryTypographyProps: { variant: 'subtitle2' },
                  ...(isSecondaryMiniVariantLeftAsideClosed && {
                    sx: listItemTextSx,
                  }),
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

        {/* Left Aside */}
        <ResponsiveDrawer
          showExitButton={isDesktop && disableHeaderMenuToggleOnMobile}
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
          <List
            {...leftAsideListProps}
            items={primaryLeftAsideListItems}
            listItemProps={{
              disableGutters: true,
              hasTooltip: isMiniVariantLeftAsideClosed,
              textProps: {
                primaryTypographyProps: { variant: 'subtitle2' },
                ...(isMiniVariantLeftAsideClosed && {
                  sx: listItemTextSx,
                }),
              },
              buttonProps: {
                sx: {
                  ...(isMiniVariant && { flexShrink: 0, px: 2.5 }),
                },
                ...(isMiniVariantLeftAsideClosed && {
                  onClick: () => setLeftAsideOpen(true),
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
        </ResponsiveDrawer>

        {/* Main */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            ...(!disablePadding && { p: 3 }),
            ...(disableGutters && { px: 0 }), // Remove horizontal padding
          }}
        >
          {children}
        </Box>

        {/* Right Aside */}
        {Boolean(rightAsideListItems?.length) && (
          <ResponsiveDrawer
            anchor="right"
            width={rightAsideWidth}
            open={isRightAsideOpen}
            onClose={() => setRightAsideOpen(false)}
            sx={{ marginTop: `${headerHeight}px` }}
          >
            <List
              dense
              items={rightAsideListItems.map((item) => ({
                ...item,
                disableGutters: true,
              }))}
            />
          </ResponsiveDrawer>
        )}
      </Box>
    </Box>
  )
}

export default DashboardLayout
