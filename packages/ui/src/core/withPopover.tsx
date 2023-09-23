import React from 'react'

import dynamic from 'next/dynamic'

const DynamicPopover = dynamic(() => import('./Popover'))

const withPopover = (props) => (children) => {
  const { title, popover: injectedPopover, ...rest } = props
  const popover = title || injectedPopover
  const popoverProps = { ...rest }

  if (!popover) return children

  return (
    <DynamicPopover trigger={children} {...popoverProps}>
      {popover}
    </DynamicPopover>
  )
}

export default withPopover
