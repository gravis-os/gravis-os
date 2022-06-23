import merge from 'lodash/merge'
import { createTheme, responsiveFontSizes } from '@mui/material'

const defaultMuiTheme = responsiveFontSizes(createTheme())
const baseTheme = merge({}, defaultMuiTheme, {
  typography: {
    fontFamily: "-apple-system, Roboto, 'Helvetica Neue', Arial, sans-serif",
    overline: {
      display: 'block',
      fontWeight: 'bold',
      letterSpacing: 2,
    },
  },
})

// ==============================
// Typography
// ==============================
const headerFontFamily =
  "Publico Headline, Source Sans Pro, -apple-system, Roboto, 'Helvetica Neue', Arial, sans-serif"
const subtitleFontFamily =
  "Publico Text, Source Sans Pro, -apple-system, Roboto, 'Helvetica Neue', Arial, sans-serif"

const baseLandingTheme = merge({}, baseTheme, {
  typography: {
    htmlFontSize: 14,
    h1: { fontFamily: headerFontFamily },
    h2: { fontFamily: headerFontFamily },
    h3: { fontFamily: headerFontFamily },
    h4: { fontFamily: headerFontFamily },
    h5: { fontFamily: subtitleFontFamily },
    h6: { fontFamily: subtitleFontFamily },
  },
})

// ==============================
// Export
// ==============================
const landingTheme = {
  light: baseLandingTheme,
  dark: merge({}, baseLandingTheme, {
    palette: {
      mode: 'dark',
    },
  }),
}

export default landingTheme
