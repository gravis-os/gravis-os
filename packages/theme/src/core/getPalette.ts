import merge from 'lodash/merge'
import { PaletteOptions, ThemeOptions } from '@mui/material/styles'
import getPaletteColorWithAugmentation from './getPaletteColorWithAugmentation'

export interface GetPaletteProps {
  themeOptions?: ThemeOptions
  paletteOptions?: PaletteOptions

  primaryColorOverride?: string
  secondaryColorOverride?: string
}

const getPalette = (props: GetPaletteProps) => {
  const {
    themeOptions,
    paletteOptions = {},
    primaryColorOverride,
    secondaryColorOverride,
  } = props

  return merge(themeOptions, {
    palette: {
      // Default colors
      ...themeOptions.palette,

      // App colors
      ...paletteOptions,

      // Spread with user-defined primary
      primary: {
        ...paletteOptions.primary,
        ...getPaletteColorWithAugmentation({
          themeOptions,
          paletteOptions,
          paletteKey: 'primary',
          mainColor: primaryColorOverride,
        }),
      },

      // Spread with user-defined secondary
      secondary: {
        ...paletteOptions.secondary,
        ...getPaletteColorWithAugmentation({
          themeOptions,
          paletteOptions,
          paletteKey: 'secondary',
          mainColor: secondaryColorOverride,
        }),
      },
    },
  })
}

export default getPalette
