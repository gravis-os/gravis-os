import { createTheme } from '@mui/material/styles'

const defaultFontFamily = '"Roboto", "Helvetica", "Arial", sans-serif'

const headerFontFamily = defaultFontFamily
const bodyFontFamily = defaultFontFamily
const overlineFontFamily = defaultFontFamily

const defaultTheme = createTheme()
const { pxToRem } = defaultTheme.typography

const typography = {
  body1: { fontWeight: 400, letterSpacing: 0.5, lineHeight: 1.56 },
  button: {
    fontFamily: overlineFontFamily,
    fontWeight: 700,
    letterSpacing: 1,
  },
  caption: {
    display: 'block',
    lineHeight: 1.5,
  },
  fontFamily: bodyFontFamily,
  h1: {
    fontFamily: headerFontFamily,
    fontSize: pxToRem(72),
    fontWeight: 300,
    lineHeight: 1,
  },
  h2: { fontFamily: headerFontFamily, lineHeight: 1.1 },
  h3: { fontFamily: headerFontFamily, fontWeight: 300, lineHeight: 1.09 },
  h4: {
    [defaultTheme.breakpoints.down('md')]: {
      fontSize: pxToRem(28),
    },
    fontFamily: headerFontFamily,
    fontSize: pxToRem(39),
    fontWeight: 400,
  },
  h5: {
    fontFamily: headerFontFamily,
    fontWeight: 400,
    letterSpacing: 0,
    lineHeight: 1.3,
  },
  h6: {
    fontFamily: headerFontFamily,
    fontWeight: 400,
    letterSpacing: 0,
    lineHeight: 1.4,
  },
  h7: {
    display: 'block',
    fontFamily: headerFontFamily,
    fontSize: pxToRem(16),
    fontWeight: 400,
    letterSpacing: 0,
    lineHeight: 1.5,
  },
  overline: {
    display: 'block',
    fontFamily: overlineFontFamily,
    fontWeight: 700,
    letterSpacing: 3,
  },
  overline2: {
    display: 'block',
    fontFamily: overlineFontFamily,
    fontSize: pxToRem(10),
    fontWeight: 700,
    letterSpacing: 2,
  },
  subtitle1: {
    fontSize: pxToRem(24),
    fontWeight: 300,
    letterSpacing: 0,
    lineHeight: 1.35,
  },
  subtitle2: {
    fontSize: pxToRem(20),
    fontWeight: 500,
    letterSpacing: 0,
    lineHeight: 1.5,
  },
  subtitle3: {
    fontSize: pxToRem(20),
    fontWeight: 300,
    letterSpacing: 0,
    lineHeight: 1.45,
  },
}

export default typography
