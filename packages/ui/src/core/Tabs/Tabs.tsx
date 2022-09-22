import React from 'react'
import Card, { CardProps } from '../Card'
import TabsBase, { TabsBaseProps } from './TabsBase'
import Tab, { TabProps } from './Tab'

export interface TabItem extends Omit<TabProps, 'children' | 'hidden'> {
  children?: React.ReactNode
  render?: ({ item }: any) => React.ReactElement
  hidden?: boolean | (({ item }: any) => boolean)
}

export interface TabsProps extends CardProps {
  currentTab?: string
  disableGutterBottom?: boolean
  handleTabsChange: (e, value: string) => void
  hasTabs: boolean
  items: TabItem[]
  tabsProps?: TabsBaseProps
  tabContentProps?: Record<string, unknown> // RenderProps
}

const Tabs: React.FC<TabsProps> = (props) => {
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
      <TabsBase
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
      </TabsBase>
    </Card>
  )
}

export default Tabs
