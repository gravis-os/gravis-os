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
  palette,
  paletteKey,
  mainColor: injectedMainColor,
}): { [key: string]: Record<string, unknown> } => {
  const mainColor = injectedMainColor || palette[paletteKey].main

  const defaultPaletteColorOptions = themeOptions.palette.augmentColor({
    color: { main: mainColor } as PaletteColorOptions,
  })

  const result = {
    [paletteKey]: {
      ...defaultPaletteColorOptions,
      gradient: createGradientFromMainColor(defaultPaletteColorOptions.main),
    },
  }

  return result
}

export default getPaletteColorWithAugmentation
