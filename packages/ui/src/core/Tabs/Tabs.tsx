import React from 'react'
import { useTheme } from '@mui/material/styles'
import { useMediaQuery } from '@mui/material'
import Card, { CardProps } from '../Card'
import TabsBase, { TabsBaseProps } from './TabsBase'
import Tab, { TabProps } from './Tab'

export interface TabsProps extends TabsBaseProps {
  currentTab?: string
  disableCard?: boolean
  handleTabsChange?: (e, value: string) => void
  hasTabs?: boolean
  items?: TabProps[]
  tabsProps?: TabsBaseProps
  cardProps?: CardProps
  children?: React.ReactNode
  renderProps?: Record<string, unknown>
  indicatorPosition?: 'top' | 'bottom'
  fullWidthOnDesktop?: boolean
}

const Tabs: React.FC<TabsProps> = (props) => {
  const {
    currentTab,
    disableCard,
    items,
    renderProps,
    handleTabsChange,
    tabsProps,
    cardProps,
    children,
    sx,
    TabIndicatorProps,
    indicatorPosition,
    fullWidthOnDesktop,
    ...rest
  } = props

  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true })

  // Terminate if no tabs
  if (!items?.length && !children) return null

  const childrenJsx = (
    <TabsBase
      onChange={handleTabsChange}
      value={currentTab}
      scrollButtons="auto"
      variant={
        fullWidthOnDesktop
          ? isDesktop
            ? 'fullWidth'
            : 'scrollable'
          : 'scrollable'
      }
      {...tabsProps}
      TabIndicatorProps={{
        ...TabIndicatorProps,
        sx: {
          ...(indicatorPosition && { [indicatorPosition]: 0 }),
          ...TabIndicatorProps?.sx,
        },
      }}
      sx={{
        '& .MuiTab-root:hover': { color: 'primary.main' },
        ...sx,
      }}
      {...rest}
    >
      {children ||
        items?.map((item) => {
          const { hidden, ...rest } = item
          const nextHidden =
            typeof hidden === 'function' && renderProps
              ? (hidden as any)(renderProps)
              : hidden
          return <Tab key={item.value} hidden={nextHidden} {...rest} />
        })}
    </TabsBase>
  )

  return !disableCard ? (
    <Card square {...{ disablePadding: true, ...cardProps }}>
      {childrenJsx}
    </Card>
  ) : (
    childrenJsx
  )
}

export default Tabs
