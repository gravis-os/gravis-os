import type { Palette } from '@mui/material'
import get from 'lodash/get'

const getPaletteColorOrFallback = (props: {
  palette: Partial<Palette>
  color?: string
}) => {
  const { palette, color } = props
  if (!color) return
  return color.includes('.') ? get(palette, color) : color
}

export default getPaletteColorOrFallback
