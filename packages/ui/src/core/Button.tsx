import React from 'react'
import flowRight from 'lodash/flowRight'
import omit from 'lodash/omit'
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined'
import withHref, { WithHrefProps } from './withHref'
import withTooltip from './withTooltip'
import withPopover from './withPopover'
import withSetLoadingInOnClick, {
  WithSetLoadingInOnClick,
} from './withSetLoadingInOnClick'
import CircularProgress from './CircularProgress'
import withDialog, { WithDialogProps } from './withDialog'
import withBox, { WithBoxProps } from './withBox'

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
  extends Omit<MuiButtonProps, 'variant' | 'onClick'> {
  disableMinWidth?: boolean
  disableLineHeight?: boolean
  disableBorderRadius?: boolean
  square?: boolean
  title?: string
  href?: WithHrefProps['href']
  hrefProps?: WithHrefProps
  dialogProps?: WithDialogProps
  boxProps?: WithBoxProps
  component?: React.JSXElementConstructor<any> | string
  fullWidthOnMobile?: boolean
  tooltip?: string
  popover?: React.ReactNode
  loading?: boolean
  targetBlank?: boolean
  onClick?: WithSetLoadingInOnClick | any
  variant?:
    | 'contained'
    | 'outlined'
    | 'text'
    | typeof BUTTON_VARIANT_PAPER
    | typeof BUTTON_VARIANT_MUTED
    | typeof BUTTON_VARIANT_ACTION
    | typeof BUTTON_VARIANT_CALLOUT
    | typeof BUTTON_VARIANT_GHOST
}

const Button: React.FC<ButtonProps> = (props) => {
  const {
    loading,
    fullWidthOnMobile,
    disableMinWidth,
    disableLineHeight,
    disableBorderRadius,
    tooltip,
    popover,
    href,
    hrefProps,
    dialogProps,
    boxProps,
    title,
    children,
    sx,
    variant,
    square,
    targetBlank,
    ...rest
  } = props
  const { color, disabled } = rest

  const isCustomVariant = [
    BUTTON_VARIANT_PAPER,
    BUTTON_VARIANT_MUTED,
    BUTTON_VARIANT_ACTION,
    BUTTON_VARIANT_CALLOUT,
    BUTTON_VARIANT_GHOST,
  ].includes(variant)
  const buttonProps = loading ? omit(rest, ['startIcon', 'endIcon']) : rest
  const childrenJsxContent = children ?? title
  const childrenJsx = (
    <MuiButton
      variant={isCustomVariant ? 'text' : variant}
      sx={{
        ...getFullWidthOnMobileSx(fullWidthOnMobile),
        ...(disableLineHeight && { lineHeight: 1 }),
        ...((square || disableBorderRadius) && { borderRadius: 0 }),
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
        // Callout variant
        ...(variant === BUTTON_VARIANT_CALLOUT && {
          color: `${color || 'primary'}.main`,
          backgroundColor: ({ palette }) =>
            alpha(palette[color || 'primary'].light, 0.18),
          '&:hover': {
            borderColor: `${color || 'primary'}.main`,
            backgroundColor: ({ palette }) =>
              alpha(palette[color || 'primary'].light, 0.24),
          },
        }),
        // Paper variant
        ...(variant === BUTTON_VARIANT_PAPER && {
          backgroundColor: 'background.paper',
          color: color ? `${color}.main` : 'text.primary',
          border: 1,
          borderColor: 'transparent',
          '&:hover': {
            backgroundColor: (theme) =>
              alpha(theme.palette.background.paper, 0.8),
            color: color ? `${color}.dark` : 'primary.main',
            borderColor: color ? `${color}.dark` : 'primary.main',
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
        // Action variant
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
        // Ghost variant
        ...(variant === BUTTON_VARIANT_GHOST && {
          backgroundColor: 'transparent',
          color: 'text.primary',
          border: 1,
          borderColor: 'divider',
          '&:hover': {
            // backgroundColor: 'action.hover',
            borderColor: 'text.primary',
          },
        }),
        // Others
        ...sx,
      }}
      {...buttonProps}
      {...(targetBlank && { endIcon: <LaunchOutlinedIcon fontSize="small" /> })}
    >
      {loading ? <CircularProgress size={20} /> : childrenJsxContent}
    </MuiButton>
  )

  return flowRight([
    withHref({
      href,
      targetBlank,
      disabled,
      ...(fullWidthOnMobile && {
        linkProps: { sx: { ...getFullWidthOnMobileSx(fullWidthOnMobile) } },
      }),
      ...hrefProps,
    }),
    withTooltip({ tooltip }),
    withPopover({ popover }),
    withSetLoadingInOnClick({ onClick: rest?.onClick }),
    withDialog(dialogProps),
    withBox(boxProps),
  ])(childrenJsx)
}

export default Button
