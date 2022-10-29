import React from 'react'
import { Box, Stack, Link, Typography, List } from '@gravis-os/ui'
import { CrudItem } from '@gravis-os/types'

export interface CategorysSideBarProps {
  items: CrudItem[]
  getHref: (item: Record<string, any>) => string
  size?: 'small' | 'medium'
}

const CategorysSideBar: React.FC<CategorysSideBarProps> = (props) => {
  const { size = 'medium', items, getHref } = props

  if (!items?.length) return null

  const isSmall = size === 'small'

  return (
    <List
      items={items.map((item) => ({
        key: item.id,
        title: item.title,
        href: getHref(item),
        buttonProps: { dense: true },
        textProps: {
          primaryTypographyProps: { variant: 'subtitle2' },
        },
      }))}
      disablePadding
    />
  )
}

export default CategorysSideBar
