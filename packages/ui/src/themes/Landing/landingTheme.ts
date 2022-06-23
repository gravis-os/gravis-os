import merge from 'lodash/merge'
import { createTheme, responsiveFontSizes } from '@mui/material'

const muiTheme = responsiveFontSizes(createTheme())
const muiDarkTheme = responsiveFontSizes(
  createTheme({ palette: { mode: 'dark' } })
)
const baseTheme = {
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

// ==============================
// Typography
// ==============================
const headerFontFamily =
  "Publico Headline, Source Sans Pro, -apple-system, Roboto, 'Helvetica Neue', Arial, sans-serif"
const subtitleFontFamily =
  "Publico Text, Source Sans Pro, -apple-system, Roboto, 'Helvetica Neue', Arial, sans-serif"

const baseLandingTheme = {
  typography: {
    htmlFontSize: 14,
    h1: { fontFamily: headerFontFamily },
    h2: { fontFamily: headerFontFamily },
    h3: { fontFamily: headerFontFamily },
    h4: { fontFamily: headerFontFamily },
    h5: { fontFamily: subtitleFontFamily },
  },
}

// ==============================
// Export
// ==============================
const landingTheme = {
  light: merge({}, muiTheme, baseTheme, baseLandingTheme),
  dark: merge({}, muiDarkTheme, baseTheme, baseLandingTheme),
}

export default landingTheme
