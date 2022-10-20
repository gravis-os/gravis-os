import React from 'react'
import { CrudItem } from '@gravis-os/types'
import { Tab, Tabs, TabsProps } from '@mui/material'
import { useRouterQuery } from '@gravis-os/query'

export interface SubcategorysFilterTabsProps extends TabsProps {
  items?: CrudItem[]
  // 'blog_category_id'
  filterKey: string
  op?: string
}

const SubcategorysFilterTabs: React.FC<SubcategorysFilterTabsProps> = (
  props
) => {
  const { items, filterKey, op = 'eq', ...rest } = props

  const { replaceQueryString, removeQueryString, parsedQs } = useRouterQuery()

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
      value={currentTabValue}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons="auto"
      {...rest}
    >
      <Tab value={defaultValue} label="All" />
      {items.map((item) => {
        if (!item) return null
        const { title, id } = item
        return <Tab key={id} value={id} label={title} />
      })}
    </Tabs>
  )
}

export default SubcategorysFilterTabs