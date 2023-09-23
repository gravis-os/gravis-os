import React from 'react'

import {
  ListItemIcon as MuiListItemIcon,
  ListItemIconProps as MuiListItemIconProps,
} from '@mui/material'

import { ListItemProps } from './ListItem'

export interface ListItemIconProps extends MuiListItemIconProps {
  dense?: ListItemProps['dense']
  fontSize?: string
}

const ListItemIcon: React.FC<ListItemIconProps> = (props) => {
  const { dense, fontSize, sx, ...rest } = props
  return (
    <MuiListItemIcon
      sx={{
        minWidth: dense ? 32 : 40,
        ...(fontSize && { '& svg': { fontSize } }),
        ...sx,
      }}
      {...rest}
    />
  )
}

export default ListItemIcon
