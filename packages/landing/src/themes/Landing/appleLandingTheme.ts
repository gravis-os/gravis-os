import { baseTheme } from '@gravis-os/ui'
import merge from 'lodash/merge'

import landingTheme from './landingTheme'

const headerFontFamily =
  "SF Pro Display, -apple-system, Roboto, 'Helvetica Neue', Arial, sans-serif"
const subtitleFontFamily = headerFontFamily

const appleLandingThemeConfig = {
  typography: {
    body1: {
      [baseTheme.light.breakpoints.up('lg')]: {
        fontSize: baseTheme.light.typography.pxToRem(19),
      },
      fontFamily: headerFontFamily,
      fontWeight: 'regular',
    },
    h1: {
      [baseTheme.light.breakpoints.up('lg')]: {
        fontSize: baseTheme.light.typography.pxToRem(96),
      },
      fontFamily: headerFontFamily,
    },
    h2: {
      [baseTheme.light.breakpoints.up('lg')]: {
        fontSize: baseTheme.light.typography.pxToRem(80),
      },
      fontFamily: headerFontFamily,
    },
    h3: {
      [baseTheme.light.breakpoints.up('lg')]: {
        fontSize: baseTheme.light.typography.pxToRem(64),
      },
      fontFamily: headerFontFamily,
      fontWeight: 600,
      lineHeight: 1.083_49,
    },
    h4: {
      [baseTheme.light.breakpoints.up('lg')]: {
        fontSize: baseTheme.light.typography.pxToRem(48),
      },
      fontFamily: headerFontFamily,
      fontWeight: 600,
      lineHeight: 1.083_49,
    },
    h5: { fontFamily: subtitleFontFamily },
    subtitle1: {
      [baseTheme.light.breakpoints.up('lg')]: {
        fontSize: baseTheme.light.typography.pxToRem(32),
      },
      fontFamily: headerFontFamily,
      fontWeight: 'medium',
      lineHeight: 1.25,
    },
    subtitle2: {
      [baseTheme.light.breakpoints.up('lg')]: {
        fontSize: baseTheme.light.typography.pxToRem(28),
      },
      fontFamily: headerFontFamily,
      fontWeight: 'medium',
      lineHeight: 1.142_86,
    },
  },
}

const appleLandingTheme = {
  dark: merge({}, landingTheme.dark, appleLandingThemeConfig),
  light: merge({}, landingTheme.light, appleLandingThemeConfig),
}

export default appleLandingTheme
