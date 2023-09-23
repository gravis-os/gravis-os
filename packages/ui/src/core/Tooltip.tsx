import React from 'react'

import {
  Tooltip as MuiTooltip,
  TooltipProps as MuiTooltipProps,
} from '@mui/material'

export interface TooltipProps extends MuiTooltipProps {}

const Tooltip: React.FC<TooltipProps> = (props) => {
  return <MuiTooltip {...props} />
}

export default Tooltip
