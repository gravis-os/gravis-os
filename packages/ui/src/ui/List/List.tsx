import React from 'react'
import { List as MuiList, ListProps as MuiListProps } from '@mui/material'
import ListItem, { ListItemProps } from './ListItem'

export interface ListProps extends MuiListProps {
  items: ListItemProps[]
}

const List: React.FC<ListProps> = (props) => {
  const { items, ...rest } = props

  if (!items.length) return null

  return (
    <MuiList {...rest}>
      {items.map((item, i) => (
        <ListItem key={item.key || `list-item-${i}`} {...item} />
      ))}
    </MuiList>
  )
}

export default List
