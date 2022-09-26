import merge from 'lodash/merge'
import {
  Palette,
  PaletteMode,
  PaletteOptions,
  ThemeOptions,
} from '@mui/material'
import { baseTheme } from '@gravis-os/ui'
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
    primary: { main: '#fff' },
    secondary: { main: '#59A5FE' },
    text: {
      primary: isDarkMode ? '#fff' : textPrimaryLight,
      secondary: '#91929C',
    },
    background: {
      default: isDarkMode ? '#1A1D25' : '#fff',
    },
  }

  return {
    typography: {
      h1: { fontFamily: headerFontFamily },
      h2: {
        fontFamily: headerFontFamily,
        lineHeight: 1.15555556,
        letterSpacing: '-0.025em',
        [baseTheme.light.breakpoints.up('lg')]: {
          fontSize: baseTheme.light.typography.pxToRem(48),
        },
      },
      h3: { fontFamily: headerFontFamily, fontWeight: 600 },
      h4: { fontFamily: headerFontFamily },
      h5: { fontFamily: subtitleFontFamily },
    },
    palette: palette as PaletteOptions,
    components: {
      MuiButton: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            ...(ownerState.color === 'primary' && {
              color: textPrimaryLight,
              '&:hover': { backgroundColor: '#fff' },
            }),
            textTransform: 'uppercase',
          }),
        },
      },
    },
  }
}

const gravisLandingTheme = {
  light: merge({}, landingTheme.light, getGravisLandingThemeConfig('light')),
  dark: merge({}, landingTheme.dark, getGravisLandingThemeConfig('dark')),
}

export default gravisLandingTheme
