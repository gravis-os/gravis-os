import React, { useState } from 'react'
import { TabsProps } from './Tabs'
import { TabProps } from './Tab'

export interface UseTabsProps {
  tabs: TabProps[]
}
export interface UseTabsReturn {
  currentTab?: TabsProps['currentTab']
  handleTabsChange: TabsProps['handleTabsChange']
  hasTabs: TabsProps['hasTabs']
  items: TabsProps['items']
}

const useTabs = (props: UseTabsProps): UseTabsReturn => {
  const { tabs } = props

  const hasTabs = tabs && tabs?.length > 0
  const defaultCurrentTab = hasTabs ? tabs[0].value : undefined
  const [currentTab, setCurrentTab] = useState<string | undefined>(
    defaultCurrentTab
  )
  const handleTabsChange = (e, value) => setCurrentTab(value)

  return {
    currentTab,
    handleTabsChange,
    hasTabs,
    items: tabs,
  }
}

export default useTabs
