import React from 'react'
import merge from 'lodash/merge'
import { List as MuiList, ListProps as MuiListProps } from '@mui/material'
import ListItem, { ListItemProps } from './ListItem'
import ListItemWithCollapse, {
  ListItemWithCollapseProps,
} from './ListItemWithCollapse'
import Divider from '../Divider'

export interface ListProps extends MuiListProps {
  items: ListItemProps[]
  listItemProps?: Omit<ListItemWithCollapseProps, 'key' | 'depth'>
}

const List: React.FC<ListProps> = (props) => {
  const { items, listItemProps: injectedListItemProps, ...rest } = props
  const { dense } = rest

  if (!items.length) return null

  return (
    <MuiList disablePadding {...rest}>
      {items.map((item, i) => {
        const key = item.key || `list-item-${i}`
        const listItemProps = merge({ dense }, injectedListItemProps, item)

        // Divider
        const isDivider = Boolean(item.divider)
        if (isDivider) return <Divider />

        // Nested List
        const hasNestedItems = Boolean(item.items)
        if (hasNestedItems) {
          return <ListItemWithCollapse key={key} depth={1} {...listItemProps} />
        }

        return <ListItem key={key} {...listItemProps} />
      })}
    </MuiList>
  )
}

export default List
