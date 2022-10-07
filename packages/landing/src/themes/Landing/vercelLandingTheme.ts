import merge from 'lodash/merge'
import { baseTheme } from '@gravis-os/ui'
import landingTheme from './landingTheme'

const headerFontFamily =
  "Inter, -apple-system, Roboto, 'Helvetica Neue', Arial, sans-serif"
const subtitleFontFamily = headerFontFamily

const vercelLandingThemeConfig = {
  typography: {
    h1: {
      fontFamily: headerFontFamily,
      [baseTheme.light.breakpoints.up('lg')]: {
        fontSize: baseTheme.light.typography.pxToRem(64),
        letterSpacing: '-.04em',
      },
    },
    h2: { fontFamily: headerFontFamily },
    h3: { fontFamily: headerFontFamily },
    h4: { fontFamily: headerFontFamily },
    h5: { fontFamily: subtitleFontFamily },
  },
}

const vercelLandingTheme = {
  light: merge({}, landingTheme.light, vercelLandingThemeConfig),
  dark: merge({}, landingTheme.dark, vercelLandingThemeConfig),
}

export default vercelLandingTheme
