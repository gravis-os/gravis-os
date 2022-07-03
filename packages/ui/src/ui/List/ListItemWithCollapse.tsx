import React, { useState, useEffect } from 'react'
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'
import Collapse, { CollapseProps } from '../Collapse'
import ListItem, { ListItemProps } from './ListItem'
import List from './List'

const INITIAL_LIST_PL = 2
const NESTED_LIST_PL_INDENT = 2

export interface ListItemWithCollapseProps
  extends Omit<ListItemProps, 'depth'> {
  depth: number
  collapseProps?: CollapseProps
}

const ListItemWithCollapse: React.FC<ListItemWithCollapseProps> = (props) => {
  const {
    collapseProps,
    open: injectedOpen,
    defaultOpen,
    depth,
    items,
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
    iconProps: rest?.iconProps,
    textProps: rest?.textProps,
    buttonProps: rest?.buttonProps,
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
          key={`nested-list-${depth}`}
          items={items.map((item) => ({
            ...item,
            ...commonListItemProps,
            // Recurse this
            depth: depth + 1,
            buttonProps: {
              sx: {
                // Calculate indentation of inner items recursively
                pl: INITIAL_LIST_PL + NESTED_LIST_PL_INDENT * depth,
                ...item.buttonProps?.sx,
              },
            },
          }))}
        />
      </Collapse>
    </>
  )
}

export default ListItemWithCollapse
