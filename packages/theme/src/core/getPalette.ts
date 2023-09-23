import { PaletteOptions, ThemeOptions } from '@mui/material/styles'
import merge from 'lodash/merge'

import getPaletteColorWithAugmentation from './getPaletteColorWithAugmentation'

export interface GetPaletteProps {
  paletteOptions?: PaletteOptions
  primaryColorOverride?: string

  secondaryColorOverride?: string
  themeOptions?: ThemeOptions
}

const getPalette = (props: GetPaletteProps) => {
  const {
    paletteOptions = {},
    primaryColorOverride,
    secondaryColorOverride,
    themeOptions,
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
          mainColor: primaryColorOverride,
          paletteKey: 'primary',
          paletteOptions,
          themeOptions,
        }),
      },

      // Spread with user-defined secondary
      secondary: {
        ...paletteOptions.secondary,
        ...getPaletteColorWithAugmentation({
          mainColor: secondaryColorOverride,
          paletteKey: 'secondary',
          paletteOptions,
          themeOptions,
        }),
      },
    },
  })
}

export default getPalette
