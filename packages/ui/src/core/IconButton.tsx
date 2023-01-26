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
  targetBlank?: boolean
}

const IconButton: React.FC<IconButtonProps> = (props) => {
  const { title, href, children, tooltip, targetBlank, sx, ...rest } = props
  const { color } = rest

  const childrenJsx = (
    <MuiIconButton
      sx={{
        '&:hover': { color: color || 'primary.main' },
        ...sx,
      }}
      {...rest}
    >
      {children || title}
    </MuiIconButton>
  )

  return flowRight([withHref({ href, targetBlank }), withTooltip({ tooltip })])(
    childrenJsx
  )
}

export default IconButton
