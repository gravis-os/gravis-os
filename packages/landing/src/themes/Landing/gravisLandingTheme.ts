import { baseTheme } from '@gravis-os/ui'
import {
  Palette,
  PaletteMode,
  PaletteOptions,
  ThemeOptions,
} from '@mui/material'
import merge from 'lodash/merge'

import landingTheme from './landingTheme'

const headerFontFamily =
  "SF Pro Display,-apple-system, Roboto, 'Helvetica Neue', Arial, sans-serif"
const subtitleFontFamily =
  "SF Pro Text,-apple-system, Roboto, 'Helvetica Neue', Arial, sans-serif"

const textPrimaryLight = '#060A0E'

type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T

const getGravisLandingThemeConfig = (mode: PaletteMode): ThemeOptions => {
  const isDarkMode = mode === 'dark'

  const palette: DeepPartial<Palette> = {
    background: {
      default: isDarkMode ? '#1A1D25' : '#fff',
    },
    primary: { main: '#fff' },
    secondary: { main: '#59A5FE' },
    text: {
      primary: isDarkMode ? '#fff' : textPrimaryLight,
      secondary: '#91929C',
    },
  }

  return {
    components: {
      MuiButton: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            ...(ownerState.color === 'primary' && {
              '&:hover': { backgroundColor: '#fff' },
              color: textPrimaryLight,
            }),
            textTransform: 'uppercase',
          }),
        },
      },
    },
    palette: palette as PaletteOptions,
    typography: {
      h1: { fontFamily: headerFontFamily },
      h2: {
        [baseTheme.light.breakpoints.up('lg')]: {
          fontSize: baseTheme.light.typography.pxToRem(48),
        },
        fontFamily: headerFontFamily,
        letterSpacing: '-0.025em',
        lineHeight: 1.155_555_56,
      },
      h3: { fontFamily: headerFontFamily, fontWeight: 600 },
      h4: { fontFamily: headerFontFamily },
      h5: { fontFamily: subtitleFontFamily },
    },
  }
}

const gravisLandingTheme = {
  dark: merge({}, landingTheme.dark, getGravisLandingThemeConfig('dark')),
  light: merge({}, landingTheme.light, getGravisLandingThemeConfig('light')),
}

export default gravisLandingTheme
