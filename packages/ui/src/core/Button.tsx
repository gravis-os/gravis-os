import React from 'react'

import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined'
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import flowRight from 'lodash/flowRight'
import omit from 'lodash/omit'

import CircularProgress from './CircularProgress'
import withBox, { WithBoxProps } from './withBox'
import withDialog, { WithDialogProps } from './withDialog'
import withHref, { WithHrefProps } from './withHref'
import withPopover from './withPopover'
import withSetLoadingInOnClick, {
  WithSetLoadingInOnClick,
} from './withSetLoadingInOnClick'
import withTooltip from './withTooltip'

// Methods
const getFullWidthOnMobileSx = (fullWidthOnMobile) => {
  return (
    fullWidthOnMobile && {
      width: { xs: '100%', md: 'initial' },
    }
  )
}

/**
 * If you're making changes to these custom variants,
 * update the ButtonVariants interface in `baseTheme.ts`
 */
const BUTTON_VARIANT_PAPER = 'paper'
const BUTTON_VARIANT_MUTED = 'muted'
const BUTTON_VARIANT_ACTION = 'action'
const BUTTON_VARIANT_CALLOUT = 'callout'
const BUTTON_VARIANT_GHOST = 'ghost'

export interface ButtonProps
  extends Omit<MuiButtonProps, 'onClick' | 'variant'> {
  boxProps?: WithBoxProps
  component?: React.JSXElementConstructor<any> | string
  dialogProps?: WithDialogProps
  disableBorderRadius?: boolean
  disableLineHeight?: boolean
  disableMinWidth?: boolean
  fullWidthOnMobile?: boolean
  href?: WithHrefProps['href']
  hrefProps?: WithHrefProps
  loading?: boolean
  onClick?: WithSetLoadingInOnClick | any
  popover?: React.ReactNode
  square?: boolean
  targetBlank?: boolean
  title?: string
  tooltip?: string
  variant?:
    | 'contained'
    | 'outlined'
    | 'text'
    | typeof BUTTON_VARIANT_ACTION
    | typeof BUTTON_VARIANT_CALLOUT
    | typeof BUTTON_VARIANT_GHOST
    | typeof BUTTON_VARIANT_MUTED
    | typeof BUTTON_VARIANT_PAPER
}

const Button: React.FC<ButtonProps> = (props) => {
  const {
    title,
    boxProps,
    children,
    dialogProps,
    disableBorderRadius,
    disableLineHeight,
    disableMinWidth,
    fullWidthOnMobile,
    href,
    hrefProps,
    loading,
    popover,
    square,
    sx,
    targetBlank,
    tooltip,
    variant,
    ...rest
  } = props
  const { color, disabled, onClick } = rest || {}

  const isCustomVariant = [
    BUTTON_VARIANT_ACTION,
    BUTTON_VARIANT_CALLOUT,
    BUTTON_VARIANT_GHOST,
    BUTTON_VARIANT_MUTED,
    BUTTON_VARIANT_PAPER,
  ].includes(variant)

  const buttonProps = loading
    ? { ...omit(rest, ['startIcon', 'endIcon']), disabled: true }
    : rest

  const childrenJsxContent = children ?? title
  const childrenJsx = (
    <MuiButton
      sx={{
        ...getFullWidthOnMobileSx(fullWidthOnMobile),
        ...(disableLineHeight && { lineHeight: 1 }),
        ...((square || disableBorderRadius) && { borderRadius: 0 }),
        ...(disableMinWidth && {
          '& .MuiButton-startIcon': { marginLeft: -0.5, marginRight: 0.5 },
          minWidth: 0,
          // Increase horizontal padding slightly to make the button width more balanced
          px: 1,
        }),
        // Outlined variant
        ...(variant === 'outlined' && {
          '&:hover': {
            borderColor: `${color || 'primary'}.dark`,
          },
          borderColor: `${color || 'primary'}.main`,
          color: `${color || 'primary'}.main`,
        }),
        // Callout variant
        ...(variant === BUTTON_VARIANT_CALLOUT && {
          '&:hover': {
            backgroundColor: ({ palette }) =>
              alpha(palette[color || 'primary'].light, 0.24),
            borderColor: `${color || 'primary'}.main`,
          },
          backgroundColor: ({ palette }) =>
            alpha(palette[color || 'primary'].light, 0.18),
          color: `${color || 'primary'}.main`,
        }),
        // Paper variant
        ...(variant === BUTTON_VARIANT_PAPER && {
          '&:hover, &:focus': {
            backgroundColor: (theme) => alpha(theme.palette.common.white, 0.8),
            borderColor: color ? `${color}.dark` : 'grey.200',
            color: color ? `${color}.dark` : 'common.black',
          },
          backgroundColor: 'common.white',
          border: 1,
          borderColor: 'transparent',
          color: color ? `${color}.main` : 'grey.900',
        }),
        // Muted variant
        ...(variant === BUTTON_VARIANT_MUTED && {
          '&:hover': {
            backgroundColor: ({ palette: { mode } }) => {
              const isDarkMode = mode === 'dark'
              return isDarkMode ? 'neutral.600' : 'grey.400'
            },
          },
          backgroundColor: ({ palette: { mode } }) => {
            const isDarkMode = mode === 'dark'
            return isDarkMode ? 'neutral.700' : 'grey.300'
          },
          color: ({ palette: { mode } }) => {
            const isDarkMode = mode === 'dark'
            return isDarkMode ? 'primary.main' : 'text.primary'
          },
        }),
        // Action variant
        ...(variant === BUTTON_VARIANT_ACTION && {
          '&:hover': {
            backgroundColor: 'action.hover',
            borderColor: 'text.secondary',
          },
          backgroundColor: 'transparent',
          border: 1,
          borderColor: 'divider',
          color: 'text.secondary',
        }),
        // Ghost variant
        ...(variant === BUTTON_VARIANT_GHOST && {
          '&:hover': {
            borderColor: 'text.primary',
          },
          backgroundColor: 'transparent',
          border: 1,
          borderColor: 'divider',
          color: 'text.primary',
        }),
        // Others
        ...sx,
      }}
      variant={isCustomVariant ? 'text' : variant}
      {...buttonProps}
      {...(targetBlank && { endIcon: <LaunchOutlinedIcon fontSize="small" /> })}
    >
      {loading ? <CircularProgress size={20} /> : childrenJsxContent}
    </MuiButton>
  )

  return flowRight([
    withHref({
      disabled,
      href,
      targetBlank,
      ...(fullWidthOnMobile && {
        linkProps: { sx: { ...getFullWidthOnMobileSx(fullWidthOnMobile) } },
      }),
      ...hrefProps,
    }),
    withTooltip({ tooltip }),
    withPopover({ popover }),
    withSetLoadingInOnClick({ onClick }),
    withDialog(dialogProps),
    withBox(boxProps),
  ])(childrenJsx)
}

export default Button
