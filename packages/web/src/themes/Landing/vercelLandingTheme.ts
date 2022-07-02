import merge from 'lodash/merge'
import landingTheme from './landingTheme'
import InterRegular from '../../../public/fonts/Inter/Inter-Regular.ttf'
import InterBold from '../../../public/fonts/Inter/Inter-Bold.ttf'
import baseTheme from '../Base/baseTheme'

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
  components: {
    // Self-hosted font: https://mui.com/material-ui/customization/typography/#self-hosted-fonts
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            src: url(${InterRegular});
        }
        
        @font-face {
            font-family: 'Inter';
            font-style: bold;
            font-weight: 700;
            src: url(${InterBold});
        }
      `,
    },
  },
}

const vercelLandingTheme = {
  light: merge({}, landingTheme.light, vercelLandingThemeConfig),
  dark: merge({}, landingTheme.dark, vercelLandingThemeConfig),
}

export default vercelLandingTheme
