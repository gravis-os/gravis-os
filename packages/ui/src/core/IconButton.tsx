import React from 'react'

import {
  IconButton as MuiIconButton,
  IconButtonProps as MuiIconButtonProps,
} from '@mui/material'
import flowRight from 'lodash/flowRight'

import withHref from './withHref'
import withTooltip from './withTooltip'

export interface IconButtonProps extends MuiIconButtonProps {
  component?: React.JSXElementConstructor<any> | string
  href?: string
  targetBlank?: boolean
  title?: string
  tooltip?: string
}

const IconButton: React.FC<IconButtonProps> = (props) => {
  const { title, children, href, sx, targetBlank, tooltip, ...rest } = props
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
