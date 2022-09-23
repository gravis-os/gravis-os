import React from 'react'
import {
  ListItemIcon as MuiListItemIcon,
  ListItemIconProps as MuiListItemIconProps,
} from '@mui/material'
import { ListItemProps } from './ListItem'

export interface ListItemIconProps extends MuiListItemIconProps {
  dense?: ListItemProps['dense']
}

const ListItemIcon: React.FC<ListItemIconProps> = (props) => {
  const { sx, dense, ...rest } = props
  return (
    <MuiListItemIcon
      sx={{
        minWidth: dense ? 32 : 40,
        ...sx,
      }}
      {...rest}
    />
  )
}

export default ListItemIcon
