import React from 'react'
import { Tab, Tabs, TabsProps } from '@gravis-os/ui'
import { useRouterQuery } from '@gravis-os/query'

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
  const { items, filterKey = 'status', filterOp = 'eq', ...rest } = props

  const { replaceQueryString, removeQueryString, parsedQs } = useRouterQuery()

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
      value={currentTabValue}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons={false}
      {...rest}
    >
      <Tab value={defaultValue} label="All" />
      {items.map((item) => {
        if (!item) return null
        return <Tab key={item.key} {...item} />
      })}
    </Tabs>
  )
}

export default CrudTableFilterTabs
