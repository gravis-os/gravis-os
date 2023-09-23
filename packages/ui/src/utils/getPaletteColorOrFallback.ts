import type { Palette } from '@mui/material'

import get from 'lodash/get'

const getPaletteColorOrFallback = (props: {
  color?: string
  palette: Partial<Palette>
}) => {
  const { color, palette } = props
  if (!color) return
  return color.includes('.') ? get(palette, color) : color
}

export default getPaletteColorOrFallback
