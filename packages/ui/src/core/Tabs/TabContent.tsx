import React from 'react'
import { TabsProps } from './Tabs'

export interface TabContentProps {
  items: TabsProps['items']
  currentTab?: TabsProps['currentTab']
  tabContentProps?: TabsProps['tabContentProps']
}

const TabContent: React.FC<TabContentProps> = (props) => {
  const { items, currentTab, tabContentProps } = props

  if (!items?.length) return null

  const currentTabItem = (items as any[]).find(
    ({ value }) => value === currentTab
  )
  const tabChildrenJsx = currentTabItem.children
  const hasRender = Boolean(currentTabItem.render)

  switch (true) {
    case hasRender:
      return currentTabItem.render(tabContentProps)
    case React.isValidElement(tabChildrenJsx):
      return React.cloneElement(tabChildrenJsx, tabContentProps)
    default:
      return tabChildrenJsx
  }
}

export default TabContent
