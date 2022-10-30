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

/**
 * If you're making changes to these custom variants,
 * update the ButtonVariants interface in `baseTheme.ts`
 */
const BUTTON_VARIANT_PAPER = 'paper'
const BUTTON_VARIANT_MUTED = 'muted'
const BUTTON_VARIANT_ACTION = 'action'

export interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  disableMinWidth?: boolean
  disableLineHeight?: boolean
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
    | typeof BUTTON_VARIANT_ACTION
}

const Button: React.FC<ButtonProps> = (props) => {
  const {
    loading,
    fullWidthOnMobile,
    disableMinWidth,
    disableLineHeight,
    tooltip,
    href,
    title,
    children,
    sx,
    variant,
    ...rest
  } = props
  const { color } = rest

  const isCustomVariant = [
    BUTTON_VARIANT_PAPER,
    BUTTON_VARIANT_MUTED,
    BUTTON_VARIANT_ACTION,
  ].includes(variant)
  const buttonProps = loading ? omit(rest, ['startIcon', 'endIcon']) : rest
  const childrenJsxContent = children ?? title
  const childrenJsx = (
    <MuiButton
      variant={isCustomVariant ? 'text' : variant}
      sx={{
        ...(fullWidthOnMobile && {
          width: { xs: '100%', md: 'initial' },
        }),
        ...(disableLineHeight && { lineHeight: 1 }),
        ...(disableMinWidth && {
          minWidth: 0,
          '& .MuiButton-startIcon': { marginRight: 0.5, marginLeft: -0.5 },
          // Increase horizontal padding slightly to make the button width more balanced
          px: 1,
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
        // TODO@Joel: Add Action Variant
        ...(variant === BUTTON_VARIANT_ACTION && {
          backgroundColor: 'transparent',
          color: 'text.secondary',
          border: 1,
          borderColor: 'divider',
          '&:hover': {
            backgroundColor: 'action.hover',
            borderColor: 'text.secondary',
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
