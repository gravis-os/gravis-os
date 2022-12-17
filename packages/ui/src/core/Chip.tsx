import React from 'react'
import { Chip as MuiChip, ChipProps as MuiChipProps } from '@mui/material'
import getPaletteColor from '../utils/getPaletteColor'

// #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
const COLOR_REGEX =
  /#[a-z0-9]{3}|#[a-z0-9]{6}|rgba?\(.+\)|hsla?\(.+\)|color\(.+\)/i

export interface ChipProps extends Omit<MuiChipProps, 'color'> {
  title?: string
  color?: string
}

const Chip: React.FC<ChipProps> = (props) => {
  const { title, children, color, ...rest } = props

  const isCustomColor = color && COLOR_REGEX.test(color)

  return (
    <MuiChip
      label={children || title}
      color={isCustomColor ? undefined : (color as MuiChipProps['color'])}
      {...rest}
      sx={{
        '&&': isCustomColor
          ? {
              backgroundColor: isCustomColor ? color : getPaletteColor(color),
              color: isCustomColor
                ? 'common.white'
                : ({ palette }) => palette[color].contrastText,
            }
          : { color: `${color}.contrastText` },

        ...rest.sx,
      }}
    />
  )
}

export default Chip
