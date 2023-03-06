import React from 'react'
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
    ...rest
  } = props

  // Terminate if no tabs
  if (!items?.length && !children) return null

  const childrenJsx = (
    <TabsBase
      onChange={handleTabsChange}
      scrollButtons="auto"
      value={currentTab}
      variant="scrollable"
      {...tabsProps}
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
