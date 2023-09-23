import React, { useEffect, useState } from 'react'

import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'

import Collapse, { CollapseProps } from '../Collapse'
import List from './List'
import ListItem, { ListItemProps } from './ListItem'

const INITIAL_LIST_PL = 2.5
const INDENTED_LIST_PL = 2

export interface ListItemWithCollapseProps
  extends Omit<ListItemProps, 'depth'> {
  collapseProps?: CollapseProps
  depth: number
}

const ListItemWithCollapse: React.FC<ListItemWithCollapseProps> = (props) => {
  const {
    collapseProps,
    defaultOpen,
    depth,
    items,
    open: injectedOpen,
    ...rest
  } = props

  const initialOpen =
    typeof defaultOpen === 'boolean' ? defaultOpen : Boolean(injectedOpen)
  const [open, setOpen] = useState<boolean>(injectedOpen || initialOpen)
  useEffect(() => {
    setOpen(open)
  }, [open])

  // Props that are shared by both parent and children ListItems
  const commonListItemProps = {
    buttonProps: rest?.buttonProps,
    iconProps: rest?.iconProps,
    textProps: rest?.textProps,
  }

  return (
    <>
      {/* ParentListItem (Outer) */}
      <ListItem
        {...rest}
        endIcon={open ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
        onClick={() => setOpen(!open)}
      />

      {/* ChildrenListItem (Inner) */}
      <Collapse in={open} timeout="auto" unmountOnExit {...collapseProps}>
        <List
          disablePadding
          items={items.map((item) => {
            if (!item) return null
            return {
              ...item,
              ...commonListItemProps,
              buttonProps: {
                ...commonListItemProps?.buttonProps,
                sx: {
                  // Calculate indentation of inner items recursively
                  pl: INITIAL_LIST_PL + INDENTED_LIST_PL * depth,
                  ...item.buttonProps?.sx,
                },
              },
              // Recurse this
              depth: depth + 1,
            }
          })}
          key={`nested-list-${depth}`}
        />
      </Collapse>
    </>
  )
}

export default ListItemWithCollapse
