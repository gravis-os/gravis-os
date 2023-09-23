import merge from 'lodash/merge'

import landingTheme from './landingTheme'

const headerFontFamily =
  "Publico Headline, -apple-system, Roboto, 'Helvetica Neue', Arial, sans-serif"
const subtitleFontFamily =
  "Publico Text, -apple-system, Roboto, 'Helvetica Neue', Arial, sans-serif"

const publicoLandingThemeConfig = {
  typography: {
    h1: {
      fontFamily: headerFontFamily,
      fontWeight: 300,
    },
    h2: { fontFamily: headerFontFamily, fontWeight: 300 },
    h3: { fontFamily: headerFontFamily, fontWeight: 300 },
    h4: { fontFamily: headerFontFamily, fontWeight: 300 },
    h5: { fontFamily: subtitleFontFamily, fontWeight: 400 },
    subtitle1: { fontFamily: subtitleFontFamily, fontWeight: 400 },
    subtitle2: { fontFamily: subtitleFontFamily, fontWeight: 400 },
  },
}

const publicoLandingTheme = {
  dark: merge({}, landingTheme.dark, publicoLandingThemeConfig),
  light: merge({}, landingTheme.light, publicoLandingThemeConfig),
}

export default publicoLandingTheme
