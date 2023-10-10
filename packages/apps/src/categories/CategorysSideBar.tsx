'use client'

import React from 'react'

import { CrudItem } from '@gravis-os/types'
import { List } from '@gravis-os/ui'
import { useSearchParams } from 'next/navigation'

export interface CategorysSideBarProps {
  getHref: (item: Record<string, any>) => string
  items: Array<CrudItem & { emoji?: string }>
}

const CategorysSideBar: React.FC<CategorysSideBarProps> = (props) => {
  const { getHref, items } = props
  const searchParams = useSearchParams()

  if (!items?.length) return null

  return (
    <List
      disableIndicator
      disablePadding
      items={items.map((item) => {
        if (!item) return
        const selected = Array.from(searchParams.values()).includes(item.slug)
        return {
          title: item.title,
          avatar: item.emoji,
          avatarProps: { sx: { fontSize: 'h6.fontSize', minWidth: 0, mr: 1 } },
          buttonProps: { dense: true },
          href: getHref(item),
          key: item.id,
          selected,
          spacing: 1,
          textProps: { primaryTypographyProps: { variant: 'subtitle2' } },
        }
      })}
    />
  )
}

export default CategorysSideBar
