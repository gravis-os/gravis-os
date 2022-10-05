import merge from 'lodash/merge'
import { createTheme } from '@mui/material'

// ====================================
// Custom Variants
// ====================================
// Reference: https://mui.com/material-ui/customization/typography/#adding-amp-disabling-variants
declare module '@mui/material/styles' {
  interface ButtonVariants {
    paper: React.CSSProperties
    muted: React.CSSProperties
  }

  // allow configuration using `createTheme`
  interface ButtonVariantsOptions {
    paper?: React.CSSProperties
    muted?: React.CSSProperties
  }
}

// Update the Button's variant prop options
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    paper: true
    muted: true
  }
}

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
    MuiInputLabel: {
      styleOverrides: {
        // Make required field asterix red
        asterisk: {
          color: muiDefaultTheme.palette.error.main,
        },
      },
    },
    MuiLink: {
      defaultProps: {
        color: 'text.primary',
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
        paper: '#fff',
      },
    },
  }),
  dark: merge({}, muiDarkTheme, baseThemeConfig, {
    palette: {
      background: {
        default: '#111',
        paper: '#1d1d1f',
      },
    },
  }),
}

export default baseTheme
