import React from 'react'

import dynamic from 'next/dynamic'

const DynamicTooltip = dynamic(() => import('./Tooltip'))

const withTooltip = (props) => (children) => {
  const { title, tooltip: injectedTooltip, ...rest } = props
  const tooltip = title || injectedTooltip
  const tooltipProps = { ...rest }

  if (!tooltip) return children

  return (
    <DynamicTooltip title={tooltip} {...tooltipProps}>
      {children}
    </DynamicTooltip>
  )
}

export default withTooltip
