import merge from 'lodash/merge'
import landingTheme from './landingTheme'
import PublicoHeadlineLight from '../../../public/fonts/Publico/PublicoHeadline-Light-Web.woff2'
import PublicoTextSemibold from '../../../public/fonts/Publico/PublicoText-Semibold-Web.woff2'
import PublicoTextRoman from '../../../public/fonts/Publico/PublicoText-Roman-Web.woff2'

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
  },
  components: {
    // Self-hosted font: https://mui.com/material-ui/customization/typography/#self-hosted-fonts
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
            font-family: 'Publico Headline';
            src: url(${PublicoHeadlineLight});
            font-weight: 300;
            font-style: normal;
            font-stretch: normal;
            font-display: swap;
        }
        @font-face {
            font-family: 'Publico Headline';
            src: url(${PublicoHeadlineLight});
            font-weight: 400;
            font-style: normal;
            font-stretch: normal;
            font-display: swap;
        }
        
        @font-face {
            font-family: 'Publico Headline';
            src: url(${PublicoHeadlineLight});
            font-weight: 500;
            font-style: normal;
            font-stretch: normal;
            font-display: swap;
        }
        
        @font-face {
            font-family: 'Publico Text';
            src: url(${PublicoTextSemibold});
            font-weight: 600;
            font-style: normal;
            font-stretch: normal;
            font-display: swap;
        }
        @font-face {
            font-family: 'Publico Text';
            src: url(${PublicoTextRoman});
            font-weight: 400;
            font-style: normal;
            font-stretch: normal;
            font-display: swap;
        }
      `,
    },
  },
}

const publicoLandingTheme = {
  light: merge({}, landingTheme.light, publicoLandingThemeConfig),
  dark: merge({}, landingTheme.dark, publicoLandingThemeConfig),
}

export default publicoLandingTheme
