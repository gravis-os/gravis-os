import merge from 'lodash/merge'
import { baseTheme } from '@gravis-os/ui'
import landingTheme from './landingTheme'

const headerFontFamily =
  "SF Pro Display,-apple-system, Roboto, 'Helvetica Neue', Arial, sans-serif"
const subtitleFontFamily =
  "SF Pro Text,-apple-system, Roboto, 'Helvetica Neue', Arial, sans-serif"

const gravisLandingOsThemeConfig = {
  typography: {
    h1: {
      fontFamily: headerFontFamily,
      fontSize: '3rem',
      [baseTheme.light.breakpoints.up('sm')]: { fontSize: '4.25rem' },
      [baseTheme.light.breakpoints.up('md')]: { fontSize: '5.5rem' },
      [baseTheme.light.breakpoints.up('lg')]: { fontSize: '6rem' },
      lineHeight: 1.05,
      fontWeight: 'bold',
      letterSpacing: '-0.02em',
      '&.MuiTypography-gutterBottom': { marginBottom: '0.2em' },
    },
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
    subtitle2: {
      fontFamily: subtitleFontFamily,
      fontSize: '1rem',
      fontWeight: 'normal',
      [baseTheme.light.breakpoints.up('sm')]: { fontSize: '1rem' },
      [baseTheme.light.breakpoints.up('md')]: { fontSize: '1rem' },
      [baseTheme.light.breakpoints.up('lg')]: { fontSize: '1.25rem' },
      lineHeight: 1.33,
    },
    body1: {
      fontFamily: subtitleFontFamily,
      fontSize: '1rem',
      [baseTheme.light.breakpoints.up('sm')]: { fontSize: '1rem' },
      [baseTheme.light.breakpoints.up('md')]: { fontSize: '1rem' },
      [baseTheme.light.breakpoints.up('lg')]: { fontSize: '1.25rem' },
      lineHeight: 1.33,
    },
  },
}

const gravisOsLandingTheme = {
  light: merge({}, landingTheme.light, gravisLandingOsThemeConfig),
  dark: merge({}, landingTheme.dark, gravisLandingOsThemeConfig),
}

export default gravisOsLandingTheme
