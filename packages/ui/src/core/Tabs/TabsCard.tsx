import React from 'react'

import Card, { CardProps } from '../Card'
import Tab, { TabProps } from './Tab'
import Tabs, { TabsProps } from './Tabs'

export interface TabsCardItem extends Omit<TabProps, 'children' | 'hidden'> {
  children?: React.ReactNode
  hidden?: (({ item }: any) => boolean) | boolean
  render?: ({ item }: any) => React.ReactElement
}

export interface TabsCardProps extends CardProps {
  currentTab?: string
  disableGutterBottom?: boolean
  handleTabsChange: (e, value: string) => void
  hasTabs: boolean
  items: TabsCardItem[]
  renderProps?: Record<string, unknown> // RenderProps
  tabsProps?: TabsProps
}

const TabsCard: React.FC<TabsCardProps> = (props) => {
  const {
    currentTab,
    disableGutterBottom,
    handleTabsChange,
    items,
    renderProps,
    tabsProps,
    ...rest
  } = props

  // Terminate if no tabs
  if (!items?.length) return null

  return (
    <Card
      square
      {...rest}
      contentProps={{
        sx: {
          '&&': { py: 0 },
          px: 2,
          ...rest?.contentProps?.sx,
        },
        ...rest?.contentProps,
      }}
      sx={{ ...(!disableGutterBottom && { mb: 3 }), ...rest?.sx }}
    >
      <Tabs
        onChange={handleTabsChange}
        scrollButtons="auto"
        value={currentTab}
        variant="scrollable"
        {...tabsProps}
      >
        {items?.map((tab) => {
          const { hidden, label, value } = tab

          // Hidden
          const hasHidden =
            typeof hidden === 'function' || typeof hidden === 'boolean'
          if (hasHidden) {
            const shouldHide =
              typeof hidden === 'function' && renderProps
                ? hidden(renderProps)
                : hidden
            if (shouldHide) return
          }

          return <Tab key={value} label={label} value={value} />
        })}
      </Tabs>
    </Card>
  )
}

export default TabsCard
