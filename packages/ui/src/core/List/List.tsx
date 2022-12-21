import React from 'react'
import merge from 'lodash/merge'
import { List as MuiList, ListProps as MuiListProps } from '@mui/material'
import ListItem, { ListItemProps } from './ListItem'
import ListItemWithCollapse, {
  ListItemWithCollapseProps,
} from './ListItemWithCollapse'
import Divider from '../Divider'
import Badge from '../Badge'
import Stack from '../Stack'

export interface ListProps extends MuiListProps {
  items: ListItemProps[]
  listItemProps?: Omit<ListItemWithCollapseProps, 'key' | 'depth'>
  disableIndicator?: boolean
  divider?: boolean
}

const List: React.FC<ListProps> = (props) => {
  const {
    items,
    listItemProps: injectedListItemProps,
    disableIndicator,
    divider,
    ...rest
  } = props
  const { dense } = rest

  if (!items.length) return null

  return (
    <MuiList disablePadding {...rest}>
      <Stack horizontalDividers={divider}>
        {items.map((item, i) => {
          if (!item) return null

          const key = item.key || `list-item-${i}`

          // Nested List
          const isNestedMenu = Boolean(item.items)

          // Divider
          const isDivider = Boolean(item.divider)

          // Highest item will not have any depth key
          const isHighestParent = typeof item.depth === 'undefined'

          // Show badge dot on the highest parent that is currently slected
          const shouldShowIndicator =
            isHighestParent &&
            (isNestedMenu ? item.open : item.selected) &&
            !disableIndicator

          // Merge props
          const listItemProps = merge({ dense }, injectedListItemProps, item, {
            startIcon: shouldShowIndicator ? (
              <Badge
                color="secondary"
                variant="dot"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                {item.startIcon}
              </Badge>
            ) : (
              item.startIcon
            ),
          })

          // Render
          switch (true) {
            case isDivider:
              return <Divider />
            case isNestedMenu:
              return (
                <ListItemWithCollapse key={key} depth={1} {...listItemProps} />
              )
            default:
              return <ListItem key={key} {...listItemProps} />
          }
        })}
      </Stack>
    </MuiList>
  )
}

export default List
