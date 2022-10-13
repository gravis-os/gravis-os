import React, { useEffect, useState } from 'react'
import { useMediaQuery, useTheme } from '@mui/material'
import { Box, HeaderProps, List, ListItemProps } from '@gravis-os/ui'
import { useRouter } from 'next/router'
import dashboardLayoutConfig from './dashboardLayoutConfig'
import ResponsiveDrawer from './ResponsiveDrawer'
import DashboardLayoutHeader from './DashboardLayoutHeader'
import getListItemsWithActiveStateFromRouter from './getListItemsWithActiveStateFromRouter'

const { miniVariantWidth, headerHeight } = dashboardLayoutConfig

export interface DashboardLayoutProps {
  // Default states
  defaultLeftAsideOpen?: boolean
  defaultRightAsideOpen?: boolean

  // Disables
  disablePadding?: boolean
  disableGutters?: boolean

  // Minivariant
  isMiniVariant?: boolean
  disableClipUnderAppBar?: boolean

  // Dark mode
  darkLeftAside?: boolean

  // Left Aside Props
  leftAsideWidth?: number
  leftAsideListItems?: ListItemProps['items']
  leftAsideListItemProps?: ListItemProps

  // Right Aside
  rightAsideListItems?: ListItemProps['items']
  rightAsideWidth?: number

  // Other elements
  headerProps?: HeaderProps
  children?: React.ReactNode
}

const DashboardLayout: React.FC<DashboardLayoutProps> = (props) => {
  const {
    children,
    defaultLeftAsideOpen = true,
    defaultRightAsideOpen = true,
    disableGutters,
    disablePadding,
    leftAsideWidth = dashboardLayoutConfig.leftAsideWidth,
    rightAsideWidth = dashboardLayoutConfig.rightAsideWidth,
    isMiniVariant,
    leftAsideListItems: injectedLeftAsideListItems,
    rightAsideListItems,
    disableClipUnderAppBar,
    darkLeftAside,
    leftAsideListItemProps,
    headerProps,
  } = props

  // States
  const [leftAsideOpen, setLeftAsideOpen] = useState(defaultLeftAsideOpen)
  const [rightAsideOpen, setRightAsideOpen] = useState(defaultRightAsideOpen)

  // Router
  const router = useRouter()
  const leftAsideListItems = getListItemsWithActiveStateFromRouter(
    injectedLeftAsideListItems,
    router
  )

  // Effects
  // Collapse asides below desktop breakpoint
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true })
  useEffect(() => {
    if (!isDesktop) {
      setLeftAsideOpen(false)
      setRightAsideOpen(false)
    }
  }, [isDesktop])

  // Booleans
  const isLeftAsideOpen = leftAsideOpen
  const isRightAsideOpen = rightAsideOpen
  const isMiniVariantLeftAsideClosed = isMiniVariant && !isLeftAsideOpen

  const layoutProps = {
    leftAsideOpen,
    setLeftAsideOpen,
    isLeftAsideOpen,

    rightAsideOpen,
    setRightAsideOpen,
    isRightAsideOpen,
  }

  return (
    <Box display="flex">
      {/* Header */}
      <DashboardLayoutHeader
        {...headerProps}
        renderProps={layoutProps}
        sx={{
          ...(disableClipUnderAppBar && {
            left: leftAsideOpen ? leftAsideWidth : miniVariantWidth,
            width: leftAsideOpen
              ? `calc(100% - ${leftAsideWidth}px)`
              : `calc(100% - ${miniVariantWidth}px)`,
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
          ...(isLeftAsideOpen && { ml: { md: `${leftAsideWidth}px` } }),
          ...(isMiniVariantLeftAsideClosed && { ml: `${miniVariantWidth}px` }),

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
        {/* Left Aside */}
        <ResponsiveDrawer
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
            overflowX: 'hidden',
            marginTop: {
              // eslint-disable-next-line no-nested-ternary
              xs: isMiniVariantLeftAsideClosed
                ? disableClipUnderAppBar
                  ? 0
                  : `${headerHeight}px`
                : 0,
              sm: disableClipUnderAppBar ? 0 : `${headerHeight}px`,
            },

            ...(isMiniVariant && {
              transition: theme.transitions.create(['width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
            }),
          }}
          open={isLeftAsideOpen}
          onClose={() => setLeftAsideOpen(false)}
          desktopDrawerProps={{
            variant: isMiniVariant ? 'permanent' : 'persistent',
          }}
        >
          <List
            items={leftAsideListItems}
            listItemProps={{
              disableGutters: true,
              hasTooltip: isMiniVariantLeftAsideClosed,
              textProps: {
                primaryTypographyProps: { variant: 'subtitle2' },
                ...(isMiniVariantLeftAsideClosed && {
                  sx: {
                    opacity: 0,
                    transition: theme.transitions.create(['opacity'], {
                      easing: theme.transitions.easing.sharp,
                      duration: theme.transitions.duration.leavingScreen,
                    }),
                  },
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
