import merge from 'lodash/merge'
import { baseTheme } from '@gravis-os/ui'
import deviasThemeLight from './deviasThemeLight'
import deviasThemeDark from './deviasThemeDark'

interface Neutral {
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
}

declare module '@mui/material/styles' {
  interface Palette {
    neutral?: Neutral
  }

  interface PaletteOptions {
    neutral?: Neutral
  }
}

const deviasThemeConfig = {
  typography: {
    h1: {
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: 1.375,
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.375,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.375,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.375,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.375,
    },
    h6: {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.375,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.57,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.75,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.57,
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '0.5px',
      lineHeight: 1.25,
      textTransform: 'uppercase',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.66,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiToolbar: {
      defaultProps: {
        disableGutters: false,
      },
    },
  },
}

const deviasTheme = {
  light: merge({}, baseTheme.light, deviasThemeConfig, deviasThemeLight),
  dark: merge({}, baseTheme.dark, deviasThemeConfig, deviasThemeDark),
}

export default deviasTheme
