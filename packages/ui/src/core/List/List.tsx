import React from 'react'

import { List as MuiList, ListProps as MuiListProps } from '@mui/material'
import merge from 'lodash/merge'
import omit from 'lodash/omit'

import Badge from '../Badge'
import Divider from '../Divider'
import Stack from '../Stack'
import ListItem, { ListItemProps } from './ListItem'
import ListItemWithCollapse, {
  ListItemWithCollapseProps,
} from './ListItemWithCollapse'

export interface ListProps extends MuiListProps {
  disableIndicator?: boolean
  divider?: boolean
  items: ListItemProps[]
  listItemProps?: Omit<ListItemWithCollapseProps, 'depth' | 'key'>
}

const List: React.FC<ListProps> = (props) => {
  const {
    disableIndicator,
    divider,
    items,
    listItemProps: injectedListItemProps,
    ...rest
  } = props
  const { dense } = rest

  if (items.length === 0) return null

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
          const isHighestParent = item.depth === undefined

          // Show badge dot on the highest parent that is currently slected
          const shouldShowIndicator =
            isHighestParent &&
            (isNestedMenu ? item.open : item.selected) &&
            !disableIndicator

          // Merge props
          const listItemProps = merge({ dense }, injectedListItemProps, item, {
            startIcon: shouldShowIndicator ? (
              <Badge
                anchorOrigin={{
                  horizontal: 'left',
                  vertical: 'top',
                }}
                color="secondary"
                variant="dot"
              >
                {item.startIcon}
              </Badge>
            ) : (
              item.startIcon
            ),
          })

          // Render
          switch (true) {
            case isDivider: {
              return <Divider />
            }
            case isNestedMenu: {
              return (
                <ListItemWithCollapse depth={1} key={key} {...listItemProps} />
              )
            }
            default: {
              return (
                <ListItem
                  key={key}
                  {...omit(listItemProps, ['collapseProps'])}
                />
              )
            }
          }
        })}
      </Stack>
    </MuiList>
  )
}

export default List
