import merge from 'lodash/merge'
import { Palette, ThemeOptions } from '@mui/material/styles'
import getPaletteColorWithAugmentation from './getPaletteColorWithAugmentation'

export interface getPaletteProps {
  themeOptions: ThemeOptions
  palette: Partial<Palette>
  primaryColorOverride?: string
  secondaryColorOverride?: string
}

const getPalette = (props: getPaletteProps) => {
  const {
    themeOptions,
    palette,
    primaryColorOverride,
    secondaryColorOverride,
  } = props

  return merge(themeOptions, {
    palette: {
      // Default colors
      ...themeOptions.palette,

      // App colors
      ...palette,

      // Spread with user-defined primary
      ...(primaryColorOverride && {
        primary: {
          ...palette.primary,
          ...getPaletteColorWithAugmentation({
            themeOptions,
            palette,
            paletteKey: 'primary',
            mainColor: primaryColorOverride,
          }).primary,
        },
      }),

      // Spread with user-defined secondary
      ...(secondaryColorOverride && {
        secondary: {
          ...palette.secondary,
          ...getPaletteColorWithAugmentation({
            themeOptions,
            palette,
            paletteKey: 'secondary',
            mainColor: secondaryColorOverride,
          }).secondary,
        },
      }),
    },
  })
}

export default getPalette
