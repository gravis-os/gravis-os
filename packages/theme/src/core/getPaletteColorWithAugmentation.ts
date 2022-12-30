import { PaletteColorOptions } from '@mui/material/styles'
import createGradientFromMainColor from './createGradientFromMainColor'

/**
 * Create multiple color shades ('light' and 'dark') based on a single main color
 * @param themeOptions
 * @param paletteKey
 * @param mainColor
 */
const getPaletteColorWithAugmentation = ({
  themeOptions,
  paletteOptions,
  paletteKey,
  mainColor: injectedMainColor,
}): { [key: string]: Record<string, unknown> } => {
  const mainColor =
    injectedMainColor ||
    (paletteOptions[paletteKey] || themeOptions.palette[paletteKey]).main

  const defaultPaletteColorOptions = themeOptions.palette.augmentColor({
    color: { main: mainColor } as PaletteColorOptions,
  })

  return {
    ...defaultPaletteColorOptions,
    gradient: createGradientFromMainColor(defaultPaletteColorOptions.main),
  }
}

export default getPaletteColorWithAugmentation
