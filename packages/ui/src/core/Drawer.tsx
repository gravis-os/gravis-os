import React from 'react'

import {
  Drawer as MuiDrawer,
  DrawerProps as MuiDrawerProps,
} from '@mui/material'

export interface DrawerProps extends MuiDrawerProps {}

const Drawer: React.FC<DrawerProps> = (props) => {
  const { PaperProps, ...rest } = props
  return (
    <MuiDrawer
      PaperProps={{
        ...PaperProps,
        sx: {
          '&::-webkit-scrollbar': {
            background:
              'transparent' /* Optional: just make scrollbar invisible */,
            width: 0 /* Remove scrollbar space */,
          },
          ...PaperProps?.sx,
        },
      }}
      {...rest}
    />
  )
}

export default Drawer
