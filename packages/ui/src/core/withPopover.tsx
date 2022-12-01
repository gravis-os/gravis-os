import React from 'react'
import Popover from './Popover'

const withPopover = (props) => (children) => {
  const { popover: injectedPopover, title, ...rest } = props
  const popover = title || injectedPopover
  const popoverProps = { ...rest }

  if (!popover) return children

  return (
    <Popover trigger={children} {...popoverProps}>
      {popover}
    </Popover>
  )
}

export default withPopover
