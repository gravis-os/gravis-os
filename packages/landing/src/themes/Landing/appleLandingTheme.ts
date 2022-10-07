import merge from 'lodash/merge'
import { baseTheme } from '@gravis-os/ui'
import landingTheme from './landingTheme'

const headerFontFamily =
  "SF Pro Display, -apple-system, Roboto, 'Helvetica Neue', Arial, sans-serif"
const subtitleFontFamily = headerFontFamily

const appleLandingThemeConfig = {
  typography: {
    h1: {
      fontFamily: headerFontFamily,
      [baseTheme.light.breakpoints.up('lg')]: {
        fontSize: baseTheme.light.typography.pxToRem(96),
      },
    },
    h2: {
      fontFamily: headerFontFamily,
      [baseTheme.light.breakpoints.up('lg')]: {
        fontSize: baseTheme.light.typography.pxToRem(80),
      },
    },
    h3: {
      fontFamily: headerFontFamily,
      fontWeight: 600,
      lineHeight: 1.08349,
      [baseTheme.light.breakpoints.up('lg')]: {
        fontSize: baseTheme.light.typography.pxToRem(64),
      },
    },
    h4: {
      fontFamily: headerFontFamily,
      fontWeight: 600,
      lineHeight: 1.08349,
      [baseTheme.light.breakpoints.up('lg')]: {
        fontSize: baseTheme.light.typography.pxToRem(48),
      },
    },
    h5: { fontFamily: subtitleFontFamily },
    subtitle1: {
      fontFamily: headerFontFamily,
      fontWeight: 'medium',
      lineHeight: 1.25,
      [baseTheme.light.breakpoints.up('lg')]: {
        fontSize: baseTheme.light.typography.pxToRem(32),
      },
    },
    subtitle2: {
      fontFamily: headerFontFamily,
      fontWeight: 'medium',
      lineHeight: 1.14286,
      [baseTheme.light.breakpoints.up('lg')]: {
        fontSize: baseTheme.light.typography.pxToRem(28),
      },
    },
    body1: {
      fontFamily: headerFontFamily,
      fontWeight: 'regular',
      [baseTheme.light.breakpoints.up('lg')]: {
        fontSize: baseTheme.light.typography.pxToRem(19),
      },
    },
  },
}

const appleLandingTheme = {
  light: merge({}, landingTheme.light, appleLandingThemeConfig),
  dark: merge({}, landingTheme.dark, appleLandingThemeConfig),
}

export default appleLandingTheme
