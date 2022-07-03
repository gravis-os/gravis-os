import React, { useState } from 'react'
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'
import ListItem from './ListItem'
import Collapse from '../Collapse'
import List from './List'

const INITIAL_LIST_PL = 2
const NESTED_LIST_PL_INDENT = 2

const ListItemWithCollapse = (props) => {
  const { depth, items, ...rest } = props
  const [open, setOpen] = useState<boolean>(true)

  return (
    <>
      {/* Outer */}
      <ListItem
        {...rest}
        endIcon={open ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
        onClick={() => setOpen(!open)}
      />

      {/* Inner */}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          key={`nested-list-${depth}`}
          items={items.map((item) => ({
            ...item,
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
