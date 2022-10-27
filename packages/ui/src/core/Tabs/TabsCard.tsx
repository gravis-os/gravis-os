import React from 'react'
import Card, { CardProps } from '../Card'
import Tabs, { TabsProps } from './Tabs'
import Tab, { TabProps } from './Tab'

export interface TabsCardItem extends Omit<TabProps, 'children' | 'hidden'> {
  children?: React.ReactNode
  render?: ({ item }: any) => React.ReactElement
  hidden?: boolean | (({ item }: any) => boolean)
}

export interface TabsCardProps extends CardProps {
  currentTab?: string
  disableGutterBottom?: boolean
  handleTabsChange: (e, value: string) => void
  hasTabs: boolean
  items: TabsCardItem[]
  tabsProps?: TabsProps
  tabContentProps?: Record<string, unknown> // RenderProps
}

const TabsCard: React.FC<TabsCardProps> = (props) => {
  const {
    currentTab,
    disableGutterBottom,
    tabContentProps,
    items,
    handleTabsChange,
    tabsProps,
    ...rest
  } = props

  // Terminate if no tabs
  if (!items?.length) return null

  return (
    <Card
      square
      {...rest}
      sx={{ ...(!disableGutterBottom && { mb: 3 }), ...rest?.sx }}
      contentProps={{
        sx: {
          '&&': { py: 0 },
          px: 2,
          ...rest?.contentProps?.sx,
        },
        ...rest?.contentProps,
      }}
    >
      <Tabs
        onChange={handleTabsChange}
        scrollButtons="auto"
        value={currentTab}
        variant="scrollable"
        {...tabsProps}
      >
        {items?.map((tab) => {
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
      </Tabs>
    </Card>
  )
}

export default TabsCard
