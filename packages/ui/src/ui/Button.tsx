import React from 'react'
import flowRight from 'lodash/flowRight'
import omit from 'lodash/omit'
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from '@mui/material'
import withHref from './withHref'
import withTooltip from './withTooltip'
import CircularProgress from './CircularProgress'

export interface ButtonProps extends MuiButtonProps {
  title?: string
  href?: string
  component?: React.JSXElementConstructor<any> | string
  fullWidthOnMobile?: boolean
  tooltip?: string
  loading?: boolean
}

const Button: React.FC<ButtonProps> = (props) => {
  const {
    loading,
    fullWidthOnMobile,
    tooltip,
    href,
    title,
    children,
    sx,
    ...rest
  } = props

  const buttonProps = loading ? omit(rest, ['startIcon', 'endIcon']) : rest

  const childrenJsxContent = children || title
  const childrenJsx = (
    <MuiButton
      sx={{
        ...(fullWidthOnMobile && {
          width: { xs: '100%', md: 'initial' },
        }),
        ...sx,
      }}
      {...buttonProps}
    >
      {loading ? <CircularProgress size={20} /> : childrenJsxContent}
    </MuiButton>
  )

  return flowRight([withHref({ href }), withTooltip({ tooltip })])(childrenJsx)
}

export default Button
