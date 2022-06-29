import merge from 'lodash/merge'
import landingTheme from './landingTheme'
import baseTheme from '../Base/baseTheme'

const headerFontFamily =
  "SF Pro Display,-apple-system, Roboto, 'Helvetica Neue', Arial, sans-serif"
const subtitleFontFamily =
  "SF Pro Text,-apple-system, Roboto, 'Helvetica Neue', Arial, sans-serif"

const gravisLandingThemeConfig = {
  typography: {
    h1: { fontFamily: headerFontFamily },
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
  },
}

const gravisLandingTheme = {
  light: merge({}, landingTheme.light, gravisLandingThemeConfig),
  dark: merge({}, landingTheme.dark, gravisLandingThemeConfig),
}

export default gravisLandingTheme
