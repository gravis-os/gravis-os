import React from 'react'
import Tooltip from './Tooltip'

const withTooltip =
  ({ tooltip }) =>
  children => {
    if (!tooltip) return children
    return <Tooltip title={tooltip}>{children}</Tooltip>
  }

export default withTooltip
