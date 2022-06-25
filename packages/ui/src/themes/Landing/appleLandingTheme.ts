import merge from 'lodash/merge'
import landingTheme from './landingTheme'
import SourceSansProRegular from '../../../public/fonts/Source Sans Pro/SourceSansPro-Regular.ttf'
import SourceSansProBold from '../../../public/fonts/Source Sans Pro/SourceSansPro-Bold.ttf'
import baseTheme from '../Base/baseTheme'

const headerFontFamily =
  "Source Sans Pro, -apple-system, Roboto, 'Helvetica Neue', Arial, sans-serif"
const subtitleFontFamily =
  "Source Sans Pro, -apple-system, Roboto, 'Helvetica Neue', Arial, sans-serif"

const appleLandingThemeConfig = {
  typography: {
    h1: {
      fontFamily: headerFontFamily,
      [baseTheme.light.breakpoints.up('lg')]: {
        fontSize: '5.3556rem',
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
            font-family: 'Source Sans Pro';
            font-style: normal;
            font-weight: 400;
            src: url(${SourceSansProRegular});
        }
        
        @font-face {
            font-family: 'Source Sans Pro';
            font-style: bold;
            font-weight: 700;
            src: url(${SourceSansProBold});
        }
      `,
    },
  },
}

const appleLandingTheme = {
  light: merge({}, landingTheme.light, appleLandingThemeConfig),
  dark: merge({}, landingTheme.dark, appleLandingThemeConfig),
}

export default appleLandingTheme
