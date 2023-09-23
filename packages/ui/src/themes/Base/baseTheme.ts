import { createTheme } from '@mui/material'
import merge from 'lodash/merge'

// ====================================
// Custom Variants
// ====================================
// Reference: https://mui.com/material-ui/customization/typography/#adding-amp-disabling-variants
declare module '@mui/material/styles' {
  interface ButtonVariants {
    action: React.CSSProperties
    callout: React.CSSProperties
    ghost: React.CSSProperties
    muted: React.CSSProperties
    paper: React.CSSProperties
  }
  interface ChipVariants {
    callout: React.CSSProperties
  }
  interface TypographyVariants {
    button2: React.CSSProperties
    h7: React.CSSProperties
    overline2: React.CSSProperties
    subtitle3: React.CSSProperties
  }

  // allow configuration using `createTheme`
  interface ButtonVariantsOptions {
    action?: React.CSSProperties
    callout?: React.CSSProperties
    ghost?: React.CSSProperties
    muted?: React.CSSProperties
    paper?: React.CSSProperties
  }
  // allow configuration using `createTheme`
  interface ChipVariantsOptions {
    callout?: React.CSSProperties
  }
}

// Update the Button's variant prop options
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    action: true
    callout: true
    ghost: true
    muted: true
    paper: true
  }
}

// Update the Chip's variant prop options
declare module '@mui/material/Chip' {
  interface ChipPropsVariantOverrides {
    callout: true
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    button2: true
    h7: true
    overline2: true
    subtitle3: true
  }
}

const muiLightTheme = createTheme()
const muiDarkTheme = createTheme({ palette: { mode: 'dark' } })

const muiDefaultTheme = muiLightTheme

const baseThemeConfig = {
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
  typography: {
    button: {
      fontWeight: 'bold',
      textTransform: 'none',
    },
    fontFamily: "-apple-system, Roboto, 'Helvetica Neue', Arial, sans-serif",
    overline: {
      display: 'block',
      fontWeight: 'bold',
      letterSpacing: 2,
    },
  },
}

const baseTheme = {
  dark: merge({}, muiDarkTheme, baseThemeConfig, {
    palette: {
      background: {
        default: '#111',
        paper: '#1d1d1f',
      },
    },
  }),
  light: merge({}, muiLightTheme, baseThemeConfig, {
    palette: {
      background: {
        default: '#fafafa',
        paper: '#fff',
      },
    },
  }),
}

export default baseTheme
