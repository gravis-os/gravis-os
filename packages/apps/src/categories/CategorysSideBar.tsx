import React from 'react'
import { List } from '@gravis-os/ui'
import { CrudItem } from '@gravis-os/types'
import { useRouter } from 'next/router'

export interface CategorysSideBarProps {
  items: Array<CrudItem & { emoji?: string }>
  getHref: (item: Record<string, any>) => string
}

const CategorysSideBar: React.FC<CategorysSideBarProps> = (props) => {
  const { items, getHref } = props
  const router = useRouter()

  if (!items?.length) return null

  return (
    <List
      disableIndicator
      items={items.map((item) => {
        if (!item) return
        const selected = Object.values(router.query).includes(item.slug)
        return {
          selected,
          key: item.id,
          title: item.title,
          href: getHref(item),
          buttonProps: { dense: true },
          textProps: { primaryTypographyProps: { variant: 'subtitle2' } },
          avatar: item.emoji,
          avatarProps: { sx: { minWidth: 0, mr: 1, fontSize: 'h6.fontSize' } },
          spacing: 1,
        }
      })}
      disablePadding
    />
  )
}

export default CategorysSideBar
