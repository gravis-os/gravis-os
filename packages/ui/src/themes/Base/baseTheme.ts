import merge from 'lodash/merge'
import { createTheme, responsiveFontSizes } from '@mui/material'

const muiLightTheme = responsiveFontSizes(createTheme())
const muiDarkTheme = responsiveFontSizes(
  createTheme({ palette: { mode: 'dark' } })
)

const baseThemeConfig = {
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiToolbar: {
      defaultProps: {
        disableGutters: true,
      },
    },
    MuiTypography: {
      defaultProps: {
        color: 'text.primary',
      },
    },
  },
  typography: {
    fontFamily: "-apple-system, Roboto, 'Helvetica Neue', Arial, sans-serif",
    overline: {
      display: 'block',
      fontWeight: 'bold',
      letterSpacing: 2,
    },
    button: {
      textTransform: 'none',
    },
  },
}

const baseTheme = {
  light: merge({}, muiLightTheme, baseThemeConfig),
  dark: merge({}, muiDarkTheme, baseThemeConfig),
}

export default baseTheme
