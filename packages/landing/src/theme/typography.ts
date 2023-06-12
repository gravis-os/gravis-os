import { createTheme } from '@mui/material/styles'
import { overlineFont, bodyFont, headerFont } from './fonts'

const headerFontFamily = headerFont.style.fontFamily
const bodyFontFamily = bodyFont.style.fontFamily
const overlineFontFamily = overlineFont.style.fontFamily

const defaultTheme = createTheme()
const { pxToRem } = defaultTheme.typography

const typography = {
  fontFamily: bodyFontFamily,
  h1: {
    fontFamily: headerFontFamily,
    fontWeight: 300,
    lineHeight: 1,
    fontSize: pxToRem(72),
  },
  h2: { fontFamily: headerFontFamily, lineHeight: 1.1 },
  h3: { fontFamily: headerFontFamily, fontWeight: 300, lineHeight: 1.09 },
  h4: {
    fontSize: pxToRem(39),
    fontFamily: headerFontFamily,
    fontWeight: 400,
    [defaultTheme.breakpoints.down('md')]: {
      fontSize: pxToRem(28),
    },
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
    fontSize: pxToRem(16),
    fontFamily: headerFontFamily,
    fontWeight: 400,
    letterSpacing: 0,
    lineHeight: 1.5,
  },
  subtitle1: {
    fontSize: pxToRem(24),
    letterSpacing: 0,
    lineHeight: 1.35,
    fontWeight: 300,
  },
  subtitle2: {
    fontSize: pxToRem(20),
    letterSpacing: 0,
    lineHeight: 1.5,
    fontWeight: 500,
  },
  subtitle3: {
    fontSize: pxToRem(20),
    letterSpacing: 0,
    lineHeight: 1.45,
    fontWeight: 300,
  },
  body1: { lineHeight: 1.56, letterSpacing: 0.5, fontWeight: 400 },
  overline: {
    fontFamily: overlineFontFamily,
    fontWeight: 700,
    letterSpacing: 3,
    display: 'block',
  },
  overline2: {
    fontSize: pxToRem(10),
    fontFamily: overlineFontFamily,
    fontWeight: 700,
    letterSpacing: 2,
    display: 'block',
  },
  button: {
    fontFamily: overlineFontFamily,
    fontWeight: 700,
    letterSpacing: 1,
  },
  caption: {
    lineHeight: 1.5,
    display: 'block',
  },
}

export default typography
