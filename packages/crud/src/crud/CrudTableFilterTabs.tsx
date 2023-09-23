import React from 'react'

import { useRouterQuery } from '@gravis-os/query'
import { Tab, Tabs, TabsProps } from '@gravis-os/ui'

export interface CrudTableFilterTabsProps extends TabsProps {
  /**
   * @example 'forum_category_id'
   */
  filterKey?: string
  /**
   * @example 'ilike'
   */
  filterOp?: string
}

const CrudTableFilterTabs: React.FC<CrudTableFilterTabsProps> = (props) => {
  const { filterKey = 'status', filterOp = 'eq', items, ...rest } = props

  const { parsedQs, removeQueryString, replaceQueryString } = useRouterQuery()

  // Current value
  const defaultValue = 'all'
  const currentFilterValue = String(parsedQs?.[filterKey])?.split('.')?.[1]
  const currentTabValue = currentFilterValue || defaultValue

  // Methods
  const handleChange = (event: React.SyntheticEvent, newTabValue) => {
    if (newTabValue === defaultValue) return removeQueryString(filterKey)
    const newQsItem = { [filterKey]: `${filterOp}.${newTabValue}` }
    return replaceQueryString(newQsItem)
  }

  return (
    <Tabs
      disableMinHeight
      onChange={handleChange}
      scrollButtons={false}
      value={currentTabValue}
      variant="scrollable"
      {...rest}
    >
      <Tab label="All" value={defaultValue} />
      {items.map((item) => {
        if (!item) return null
        return <Tab key={item.key} {...item} />
      })}
    </Tabs>
  )
}

export default CrudTableFilterTabs
