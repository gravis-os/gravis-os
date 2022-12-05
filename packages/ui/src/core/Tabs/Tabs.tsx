import React from 'react'
import Card, { CardProps } from '../Card'
import TabsBase, { TabsBaseProps } from './TabsBase'
import Tab, { TabProps } from './Tab'

export interface TabItem extends Omit<TabProps, 'children' | 'hidden'> {
  children?: React.ReactNode
  render?: ({ item }: any) => React.ReactElement
  hidden?: boolean | (({ item }: any) => boolean)
}

export interface TabsProps extends TabsBaseProps {
  currentTab?: string
  disableGutterBottom?: boolean
  disableCard?: boolean
  handleTabsChange?: (e, value: string) => void
  hasTabs?: boolean
  items?: TabItem[]
  tabsProps?: TabsBaseProps
  cardProps?: CardProps
  tabContentProps?: Record<string, unknown> // RenderProps
  children?: React.ReactNode
}

const Tabs: React.FC<TabsProps> = (props) => {
  const {
    currentTab,
    disableGutterBottom,
    disableCard,
    tabContentProps,
    items,
    handleTabsChange,
    tabsProps,
    cardProps,
    children,
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
      {...rest}
    >
      {children ||
        items?.map((tab) => {
          const { hidden } = tab

          // Hidden
          const hasHidden =
            typeof hidden === 'function' || typeof hidden === 'boolean'
          if (hasHidden) {
            const shouldHide =
              typeof hidden === 'function' && tabContentProps
                ? hidden(tabContentProps)
                : hidden
            if (shouldHide) return
          }

          return <Tab key={tab.value} label={tab.label} value={tab.value} />
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
