import { baseTheme } from '@gravis-os/ui'
import merge from 'lodash/merge'

import landingTheme from './landingTheme'

const headerFontFamily =
  "SF Pro Display,-apple-system, Roboto, 'Helvetica Neue', Arial, sans-serif"
const subtitleFontFamily =
  "SF Pro Text,-apple-system, Roboto, 'Helvetica Neue', Arial, sans-serif"

const gravisLandingOsThemeConfig = {
  typography: {
    body1: {
      [baseTheme.light.breakpoints.up('lg')]: { fontSize: '1.25rem' },
      [baseTheme.light.breakpoints.up('md')]: { fontSize: '1rem' },
      [baseTheme.light.breakpoints.up('sm')]: { fontSize: '1rem' },
      fontFamily: subtitleFontFamily,
      fontSize: '1rem',
      lineHeight: 1.33,
    },
    h1: {
      '&.MuiTypography-gutterBottom': { marginBottom: '0.2em' },
      [baseTheme.light.breakpoints.up('lg')]: { fontSize: '6rem' },
      [baseTheme.light.breakpoints.up('md')]: { fontSize: '5.5rem' },
      [baseTheme.light.breakpoints.up('sm')]: { fontSize: '4.25rem' },
      fontFamily: headerFontFamily,
      fontSize: '4rem',
      fontWeight: 'bold',
      letterSpacing: '-0.02em',
      lineHeight: 1.05,
    },
    h2: {
      [baseTheme.light.breakpoints.up('lg')]: { fontSize: '4rem' },
      [baseTheme.light.breakpoints.up('md')]: { fontSize: '3.75rem' },
      [baseTheme.light.breakpoints.up('sm')]: { fontSize: '3.5rem' },
      fontFamily: headerFontFamily,
      fontSize: '3rem',
      letterSpacing: '-0.025em',
      lineHeight: 1.155_555_56,
    },
    h3: {
      [baseTheme.light.breakpoints.up('lg')]: { fontSize: '2.75rem' },
      [baseTheme.light.breakpoints.up('md')]: { fontSize: '2.5rem' },
      [baseTheme.light.breakpoints.up('sm')]: { fontSize: '2.25rem' },
      fontFamily: headerFontFamily,
      fontSize: '2rem',
      fontWeight: 600,
    },
    h4: { fontFamily: headerFontFamily },
    h5: { fontFamily: subtitleFontFamily },
    subtitle2: {
      [baseTheme.light.breakpoints.up('lg')]: { fontSize: '1.25rem' },
      [baseTheme.light.breakpoints.up('md')]: { fontSize: '1rem' },
      [baseTheme.light.breakpoints.up('sm')]: { fontSize: '1rem' },
      fontFamily: subtitleFontFamily,
      fontSize: '1rem',
      fontWeight: 'normal',
      lineHeight: 1.33,
    },
  },
}

const gravisOsLandingTheme = {
  dark: merge({}, landingTheme.dark, gravisLandingOsThemeConfig),
  light: merge({}, landingTheme.light, gravisLandingOsThemeConfig),
}

export default gravisOsLandingTheme
