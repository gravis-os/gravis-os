import merge from 'lodash/merge'
import baseTheme from '../Base/baseTheme'

const headerFontFamily =
  "-apple-system, Roboto, 'Helvetica Neue', Arial, sans-serif"
const subtitleFontFamily =
  "-apple-system, Roboto, 'Helvetica Neue', Arial, sans-serif"

const baseLandingThemeConfig = {
  typography: {
    /**
     * Ensure to set this manually on the html tag in the template.
     * If you're using storybook then set this in .storybook/preview-head.html
     */
    htmlFontSize: 16,
    h1: {
      fontFamily: headerFontFamily,
      fontSize: '2.5rem',
      [baseTheme.light.breakpoints.up('sm')]: { fontSize: '3rem' },
      [baseTheme.light.breakpoints.up('md')]: { fontSize: '3.25rem' },
      [baseTheme.light.breakpoints.up('lg')]: { fontSize: '3.75rem' },
      lineHeight: 1.05,
      fontWeight: 'bold',
      '&.MuiTypography-gutterBottom': { marginBottom: '0.3em' },
    },
    h2: { fontFamily: headerFontFamily, lineHeight: 1.07, fontWeight: 'bold' },
    h3: {
      fontFamily: headerFontFamily,
      lineHeight: 1.08349,
      fontWeight: 'bold',
    },
    h4: { fontFamily: headerFontFamily, fontWeight: 'bold' },
    h5: { fontFamily: subtitleFontFamily, fontWeight: 'medium' },
    subtitle1: {
      fontFamily: subtitleFontFamily,
      fontSize: '1.25rem',
      [baseTheme.light.breakpoints.up('sm')]: { fontSize: '1.25rem' },
      [baseTheme.light.breakpoints.up('md')]: { fontSize: '1.25rem' },
      [baseTheme.light.breakpoints.up('lg')]: { fontSize: '1.5rem' },
      lineHeight: 1.33,
    },
    subtitle2: {
      fontFamily: subtitleFontFamily,
      fontSize: '1rem',
      [baseTheme.light.breakpoints.up('sm')]: { fontSize: '1rem' },
      [baseTheme.light.breakpoints.up('md')]: { fontSize: '1rem' },
      [baseTheme.light.breakpoints.up('lg')]: { fontSize: '1.25rem' },
      lineHeight: 1.33,
    },
    overline: {
      fontFamily: subtitleFontFamily,
      fontSize: '0.75rem',
      [baseTheme.light.breakpoints.up('sm')]: { fontSize: '0.75rem' },
      [baseTheme.light.breakpoints.up('md')]: { fontSize: '0.75rem' },
      [baseTheme.light.breakpoints.up('lg')]: { fontSize: '0.8rem' },
      letterSpacing: 2,
      lineHeight: 1.33,
      '&.MuiTypography-gutterBottom': { marginBottom: '1em' },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1390,
    },
  },
}

// ==============================
// Export
// ==============================
const landingTheme = {
  light: merge({}, baseTheme.light, baseLandingThemeConfig),
  dark: merge({}, baseTheme.dark, baseLandingThemeConfig),
}

export default landingTheme
