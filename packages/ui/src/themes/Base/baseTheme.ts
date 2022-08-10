import merge from 'lodash/merge'
import { createTheme } from '@mui/material'

const muiLightTheme = createTheme()
const muiDarkTheme = createTheme({ palette: { mode: 'dark' } })

const muiDefaultTheme = muiLightTheme

const baseThemeConfig = {
  typography: {
    fontFamily: "-apple-system, Roboto, 'Helvetica Neue', Arial, sans-serif",
    overline: {
      display: 'block',
      fontWeight: 'bold',
      letterSpacing: 2,
    },
    button: {
      textTransform: 'none',
      fontWeight: 'bold',
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiToolbar: {
      defaultProps: {
        disableGutters: true,
      },
      styleOverrides: {
        regular: {
          [muiDefaultTheme.breakpoints.up('sm')]: {
            minHeight: 56,
          },
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        color: 'text.primary',
      },
    },
  },
}

const baseTheme = {
  light: merge({}, muiLightTheme, baseThemeConfig, {
    palette: {
      background: {
        default: '#fafafa',
      },
    },
  }),
  dark: merge({}, muiDarkTheme, baseThemeConfig, {
    palette: {
      background: {
        default: '#000',
        paper: '#1d1d1f',
      },
    },
  }),
}

export default baseTheme
