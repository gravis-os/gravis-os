import React from 'react'
import Tooltip from './Tooltip'

const withTooltip = (props) => (children) => {
  const { tooltip: injectedTooltip, title, ...rest } = props
  const tooltip = title || injectedTooltip
  const tooltipProps = { ...rest }

  if (!tooltip) return children

  return (
    <Tooltip title={tooltip} {...tooltipProps}>
      {children}
    </Tooltip>
  )
}

export default withTooltip
