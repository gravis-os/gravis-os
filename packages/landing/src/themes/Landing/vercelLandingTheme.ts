import { baseTheme } from '@gravis-os/ui'
import merge from 'lodash/merge'

import landingTheme from './landingTheme'

const headerFontFamily =
  "Inter, -apple-system, Roboto, 'Helvetica Neue', Arial, sans-serif"
const subtitleFontFamily = headerFontFamily

const vercelLandingThemeConfig = {
  typography: {
    h1: {
      [baseTheme.light.breakpoints.up('lg')]: {
        fontSize: baseTheme.light.typography.pxToRem(64),
        letterSpacing: '-.04em',
      },
      fontFamily: headerFontFamily,
    },
    h2: { fontFamily: headerFontFamily },
    h3: { fontFamily: headerFontFamily },
    h4: { fontFamily: headerFontFamily },
    h5: { fontFamily: subtitleFontFamily },
  },
}

const vercelLandingTheme = {
  dark: merge({}, landingTheme.dark, vercelLandingThemeConfig),
  light: merge({}, landingTheme.light, vercelLandingThemeConfig),
}

export default vercelLandingTheme
