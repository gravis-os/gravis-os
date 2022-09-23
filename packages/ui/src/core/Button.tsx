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

const BUTTON_VARIANT_PAPER = 'paper'
const BUTTON_VARIANT_MUTED = 'muted'

export interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  title?: string
  href?: string
  component?: React.JSXElementConstructor<any> | string
  fullWidthOnMobile?: boolean
  tooltip?: string
  loading?: boolean
  variant?:
    | 'contained'
    | 'outlined'
    | 'text'
    | typeof BUTTON_VARIANT_PAPER
    | typeof BUTTON_VARIANT_MUTED
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

  const isCustomVariant = [BUTTON_VARIANT_PAPER, BUTTON_VARIANT_MUTED].includes(
    variant
  )
  const buttonProps = loading ? omit(rest, ['startIcon', 'endIcon']) : rest
  const childrenJsxContent = children || title
  const childrenJsx = (
    <MuiButton
      variant={isCustomVariant ? 'text' : variant}
      sx={{
        ...(fullWidthOnMobile && {
          width: { xs: '100%', md: 'initial' },
        }),
        // Outlined variant
        ...(variant === 'outlined' && {
          color: `${color || 'primary'}.main`,
          borderColor: `${color || 'primary'}.main`,
          '&:hover': {
            borderColor: `${color || 'primary'}.dark`,
          },
        }),
        // Paper variant
        ...(variant === BUTTON_VARIANT_PAPER && {
          backgroundColor: 'background.paper',
          '&:hover': {
            backgroundColor: (theme) =>
              alpha(theme.palette.background.paper, 0.8),
            color: `${color || 'primary'}.dark`,
          },
        }),
        // Muted variant
        ...(variant === BUTTON_VARIANT_MUTED && {
          backgroundColor: ({ palette: { mode } }) => {
            const isDarkMode = mode === 'dark'
            return isDarkMode ? 'neutral.700' : 'grey.300'
          },
          color: ({ palette: { mode } }) => {
            const isDarkMode = mode === 'dark'
            return isDarkMode ? 'primary.main' : 'text.primary'
          },
          '&:hover': {
            backgroundColor: ({ palette: { mode } }) => {
              const isDarkMode = mode === 'dark'
              return isDarkMode ? 'neutral.600' : 'grey.400'
            },
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
