import React from 'react'

import {
  Divider as MuiDivider,
  DividerProps as MuiDividerProps,
} from '@mui/material'

export interface DividerProps extends MuiDividerProps {}

const Divider: React.FC<DividerProps> = (props) => {
  return <MuiDivider {...props} />
}

export default Divider
