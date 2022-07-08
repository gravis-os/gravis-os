import React from 'react'
import flowRight from 'lodash/flowRight'
import omit from 'lodash/omit'
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import withHref from './withHref'
import withTooltip from './withTooltip'
import CircularProgress from './CircularProgress'

export interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  title?: string
  href?: string
  component?: React.JSXElementConstructor<any> | string
  fullWidthOnMobile?: boolean
  tooltip?: string
  loading?: boolean
  variant?: 'contained' | 'outlined' | 'text' | 'paper'
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
    variant,
    ...rest
  } = props
  const { color } = rest

  const isCustomVariant = ['paper'].includes(variant)
  const buttonProps = loading ? omit(rest, ['startIcon', 'endIcon']) : rest
  const childrenJsxContent = children || title
  const childrenJsx = (
    <MuiButton
      variant={isCustomVariant ? 'text' : variant}
      sx={{
        ...(fullWidthOnMobile && {
          width: { xs: '100%', md: 'initial' },
        }),
        ...(variant === 'paper' && {
          backgroundColor: 'background.paper',
          '&:hover': {
            backgroundColor: (theme) =>
              alpha(theme.palette.background.paper, 0.8),
            color: `${color || 'primary'}.dark`,
          },
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
