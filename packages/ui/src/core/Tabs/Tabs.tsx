import React from 'react'

import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import Card, { CardProps } from '../Card'
import Tab, { TabProps } from './Tab'
import TabsBase, { TabsBaseProps } from './TabsBase'

export interface TabsProps extends TabsBaseProps {
  cardProps?: CardProps
  children?: React.ReactNode
  currentTab?: string
  disableCard?: boolean
  fullWidthOnDesktop?: boolean
  handleTabsChange?: (e, value: string) => void
  hasTabs?: boolean
  indicatorPosition?: 'bottom' | 'top'
  items?: TabProps[]
  renderProps?: Record<string, unknown>
  tabsProps?: TabsBaseProps
}

const Tabs: React.FC<TabsProps> = (props) => {
  const {
    cardProps,
    children,
    currentTab,
    disableCard,
    fullWidthOnDesktop,
    handleTabsChange,
    indicatorPosition,
    items,
    renderProps,
    sx,
    TabIndicatorProps,
    tabsProps,
    ...rest
  } = props

  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true })

  // Terminate if no tabs
  if (!items?.length && !children) return null

  const getVariant = () => {
    const desktopVariant = fullWidthOnDesktop ? 'fullWidth' : 'scrollable'
    return isDesktop ? desktopVariant : 'scrollable'
  }
  const variant = getVariant()

  const childrenJsx = (
    <TabsBase
      onChange={handleTabsChange}
      scrollButtons="auto"
      value={currentTab}
      variant={variant}
      {...tabsProps}
      TabIndicatorProps={{
        ...TabIndicatorProps,
        sx: {
          ...(indicatorPosition && { [indicatorPosition]: 0 }),
          ...TabIndicatorProps?.sx,
        },
      }}
      hoverColor="primary.main"
      sx={sx}
      {...rest}
    >
      {children ||
        items?.map((item) => {
          const { hidden, ...rest } = item
          const nextHidden =
            typeof hidden === 'function' && renderProps
              ? (hidden as any)(renderProps)
              : hidden
          return <Tab hidden={nextHidden} key={item.value} {...rest} />
        })}
    </TabsBase>
  )

  return disableCard ? (
    childrenJsx
  ) : (
    <Card square {...{ disablePadding: true, ...cardProps }}>
      {childrenJsx}
    </Card>
  )
}

export default Tabs
