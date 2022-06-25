import merge from 'lodash/merge'
import landingTheme from './landingTheme'

const headerFontFamily =
  "SF Pro Display,-apple-system, Roboto, 'Helvetica Neue', Arial, sans-serif"
const subtitleFontFamily =
  "SF Pro Text,-apple-system, Roboto, 'Helvetica Neue', Arial, sans-serif"

const gravisLandingThemeConfig = {
  typography: {
    h1: { fontFamily: headerFontFamily },
    h2: { fontFamily: headerFontFamily },
    h3: { fontFamily: headerFontFamily },
    h4: { fontFamily: headerFontFamily },
    h5: { fontFamily: subtitleFontFamily },
  },
}

const gravisLandingTheme = {
  light: merge({}, landingTheme.light, gravisLandingThemeConfig),
  dark: merge({}, landingTheme.dark, gravisLandingThemeConfig),
}

export default gravisLandingTheme
