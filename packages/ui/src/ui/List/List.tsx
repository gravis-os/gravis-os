import React from 'react'
import { List as MuiList, ListProps as MuiListProps } from '@mui/material'
import ListItem, { ListItemProps } from './ListItem'
import ListItemWithCollapse from './ListItemWithCollapse'

export interface ListProps extends MuiListProps {
  items: ListItemProps[]
}

const List: React.FC<ListProps> = (props) => {
  const { items, ...rest } = props

  if (!items.length) return null

  return (
    <MuiList {...rest}>
      {items.map((item, i) => {
        const key = item.key || `list-item-${i}`

        // Nested List
        const hasNestedItems = Boolean(item.items)
        if (hasNestedItems) {
          return <ListItemWithCollapse key={key} depth={i + 1} {...item} />
        }

        return <ListItem key={key} {...item} />
      })}
    </MuiList>
  )
}

export default List
