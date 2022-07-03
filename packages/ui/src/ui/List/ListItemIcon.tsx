import React from 'react'
import {
  ListItemIcon as MuiListItemIcon,
  ListItemIconProps as MuiListItemIconProps,
} from '@mui/material'

export interface ListItemIconProps extends MuiListItemIconProps {}

const ListItemIcon: React.FC<ListItemIconProps> = (props) => {
  const { sx, ...rest } = props
  return (
    <MuiListItemIcon
      sx={{
        minWidth: 40,
        ...sx,
      }}
      {...rest}
    />
  )
}

export default ListItemIcon
