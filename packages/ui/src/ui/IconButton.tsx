import React from 'react'
import flowRight from 'lodash/flowRight'
import {
  IconButton as MuiIconButton,
  IconButtonProps as MuiIconButtonProps,
} from '@mui/material'
import withTooltip from './withTooltip'
import withHref from './withHref'

export interface IconButtonProps extends MuiIconButtonProps {
  title?: string
  component?: React.JSXElementConstructor<any> | string
  href?: string
  tooltip?: string
}

const IconButton: React.FC<IconButtonProps> = props => {
  const { title, href, children, tooltip, ...rest } = props

  const childrenJsx = (
    <MuiIconButton {...rest}>{children || title}</MuiIconButton>
  )

  return flowRight([withHref({ href }), withTooltip({ tooltip })])(childrenJsx)
}

export default IconButton
