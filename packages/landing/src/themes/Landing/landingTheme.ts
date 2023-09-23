import { baseTheme } from '@gravis-os/ui'
import merge from 'lodash/merge'

const headerFontFamily =
  "-apple-system, Roboto, 'Helvetica Neue', Arial, sans-serif"
const subtitleFontFamily =
  "-apple-system, Roboto, 'Helvetica Neue', Arial, sans-serif"

const baseLandingThemeConfig = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1390,
    },
  },
  typography: {
    h1: {
      '&.MuiTypography-gutterBottom': { marginBottom: '0.3em' },
      [baseTheme.light.breakpoints.up('lg')]: { fontSize: '5rem' },
      [baseTheme.light.breakpoints.up('md')]: { fontSize: '4.5rem' },
      [baseTheme.light.breakpoints.up('sm')]: { fontSize: '4.25rem' },
      fontFamily: headerFontFamily,
      fontSize: '3.75rem',
      fontWeight: 'bold',
      lineHeight: 1.05,
    },
    h2: { fontFamily: headerFontFamily, fontWeight: 'bold', lineHeight: 1.07 },
    h3: {
      fontFamily: headerFontFamily,
      fontWeight: 'bold',
      lineHeight: 1.083_49,
    },
    h4: { fontFamily: headerFontFamily, fontWeight: 'bold' },
    h5: { fontFamily: subtitleFontFamily, fontWeight: 'medium' },
    /**
     * Ensure to set this manually on the html tag in the template.
     * If you're using storybook then set this in .storybook/preview-head.html
     */
    htmlFontSize: 16,
    overline: {
      '&.MuiTypography-gutterBottom': { marginBottom: '1em' },
      [baseTheme.light.breakpoints.up('lg')]: { fontSize: '0.8rem' },
      [baseTheme.light.breakpoints.up('md')]: { fontSize: '0.75rem' },
      [baseTheme.light.breakpoints.up('sm')]: { fontSize: '0.75rem' },
      fontFamily: subtitleFontFamily,
      fontSize: '0.75rem',
      letterSpacing: 2,
      lineHeight: 1.33,
    },
    subtitle1: {
      [baseTheme.light.breakpoints.up('lg')]: { fontSize: '1.5rem' },
      [baseTheme.light.breakpoints.up('md')]: { fontSize: '1.25rem' },
      [baseTheme.light.breakpoints.up('sm')]: { fontSize: '1.25rem' },
      fontFamily: subtitleFontFamily,
      fontSize: '1.25rem',
      lineHeight: 1.33,
    },
    subtitle2: {
      [baseTheme.light.breakpoints.up('lg')]: { fontSize: '1.25rem' },
      [baseTheme.light.breakpoints.up('md')]: { fontSize: '1rem' },
      [baseTheme.light.breakpoints.up('sm')]: { fontSize: '1rem' },
      fontFamily: subtitleFontFamily,
      fontSize: '1rem',
      lineHeight: 1.33,
    },
  },
}

// ==============================
// Export
// ==============================
const landingTheme = {
  dark: merge({}, baseTheme.dark, baseLandingThemeConfig),
  light: merge({}, baseTheme.light, baseLandingThemeConfig),
}

export default landingTheme
