import React from 'react'

import {
  Switch as MuiSwitch,
  SwitchProps as MuiSwitchProps,
} from '@mui/material'

export interface SwitchProps extends MuiSwitchProps {}

const Switch: React.FC<SwitchProps> = (props) => {
  return <MuiSwitch {...props} />
}

export default Switch
