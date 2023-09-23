import React from 'react'

import { useRouterQuery } from '@gravis-os/query'
import { CrudItem } from '@gravis-os/types'
import { Tab, Tabs, TabsProps } from '@gravis-os/ui'

export interface SubcategorysFilterTabsProps extends Omit<TabsProps, 'items'> {
  // @example 'forum_category_id'
  filterKey: string
  items?: CrudItem[]
  op?: string
}

const SubcategorysFilterTabs: React.FC<SubcategorysFilterTabsProps> = (
  props
) => {
  const { filterKey, items, op = 'eq', ...rest } = props

  const { parsedQs, removeQueryString, replaceQueryString } = useRouterQuery()

  // Current value
  const defaultValue = 0
  const currentFilterValue = Number(
    String(parsedQs?.[filterKey])?.split('.')?.[1]
  )
  const currentTabValue = Number.isNaN(currentFilterValue)
    ? defaultValue
    : currentFilterValue

  // Methods
  const handleChange = (event: React.SyntheticEvent, newTabValue: number) => {
    if (newTabValue === defaultValue) return removeQueryString(filterKey)

    const filterValue = newTabValue
    const newQsItem = { [filterKey]: `${op}.${filterValue}` }
    return replaceQueryString(newQsItem)
  }

  return (
    <Tabs
      disableCard
      disableMinHeight
      onChange={handleChange}
      scrollButtons="auto"
      value={currentTabValue}
      variant="scrollable"
      {...rest}
    >
      <Tab label="All" value={defaultValue} />
      {items.map((item) => {
        if (!item) return null
        const { id, title } = item
        return <Tab key={id} label={title} value={id} />
      })}
    </Tabs>
  )
}

export default SubcategorysFilterTabs
