import React from 'react'
import { Chip as MuiChip, ChipProps as MuiChipProps } from '@mui/material'
import { alpha } from '@mui/material/styles'
import getPaletteColor from '../utils/getPaletteColor'
import withHref, { WithHrefProps } from './withHref'

// #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
const COLOR_REGEX =
  /#[a-z0-9]{3}|#[a-z0-9]{6}|rgba?\(.+\)|hsla?\(.+\)|color\(.+\)/i

/**
 * If you're making changes to these custom variants,
 * update the ChipVariants interface in `baseTheme.ts`
 */
export const CHIP_VARIANT_CALLOUT = 'callout'

export interface ChipProps
  extends Omit<MuiChipProps, 'children' | 'color' | 'variant'> {
  title?: string
  children?: React.ReactNode
  color?: string
  hoverColor?: string
  variant?: MuiChipProps['variant'] | typeof CHIP_VARIANT_CALLOUT
  square?: boolean
  href?: string
  hrefProps?: Omit<WithHrefProps, 'href'>
}

const Chip: React.FC<ChipProps> = (props) => {
  const {
    href,
    hrefProps,
    title,
    children,
    color,
    hoverColor = 'primary',
    variant,
    square,
    ...rest
  } = props

  const isCustomColor = color && COLOR_REGEX.test(color)
  const isCustomVariant = [CHIP_VARIANT_CALLOUT].includes(variant)

  const childrenJsx = (
    <MuiChip
      label={children || title}
      color={isCustomColor ? undefined : (color as MuiChipProps['color'])}
      variant={isCustomVariant ? 'filled' : variant}
      {...(href && { clickable: true })}
      {...rest}
      sx={{
        // Color non-custom variants
        ...(!isCustomVariant && {
          '&&': isCustomColor
            ? {
                backgroundColor: isCustomColor ? color : getPaletteColor(color),
                color: isCustomColor
                  ? 'common.white'
                  : ({ palette }) => palette[color].contrastText,
              }
            : {
                color: color && `${color}.contrastText`,
                '&:hover': {
                  ...(typeof color === 'undefined' && {
                    color: `${hoverColor}.main`,
                  }),
                  backgroundColor: ({ palette }) =>
                    color
                      ? alpha(palette[color].light, 0.24)
                      : palette.action.hover,
                },
              },
        }),

        // Callout variant
        ...(variant === CHIP_VARIANT_CALLOUT && {
          color: `${color || 'primary'}.main`,
          backgroundColor: ({ palette }) =>
            alpha(palette[color || 'primary'].light, 0.18),
          '&:hover': {
            borderColor: `${color || 'primary'}.main`,
            backgroundColor: ({ palette }) =>
              alpha(palette[color || 'primary'].light, 0.24),
          },
        }),

        ...(square && { borderRadius: 1 }),

        ...rest.sx,

        // Hover on the icon
        '&& .MuiChip-deleteIcon:hover': {
          color: color ? `${color}.contrastText` : 'action.active',
        },
      }}
    />
  )

  return <>{withHref({ href, ...hrefProps })(childrenJsx)}</>
}

export default Chip
