import { baseTheme } from '@gravis-os/ui'
import merge from 'lodash/merge'

const dashboardThemeConfig = {
  components: {
    MuiToolbar: {
      defaultProps: {
        disableGutters: false,
      },
    },
  },
  typography: {
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.57,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.66,
    },
    h1: {
      fontSize: '2.25rem',
      fontWeight: 700,
      lineHeight: 1.375,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.375,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.375,
    },
    h4: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.375,
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.375,
    },
    h6: {
      fontSize: '0.875rem',
      fontWeight: 600,
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '0.5px',
      lineHeight: 1.25,
      textTransform: 'uppercase',
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.75,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.57,
    },
  },
}

const dashboardTheme = {
  dark: merge({}, baseTheme.dark, dashboardThemeConfig),
  light: merge({}, baseTheme.light, dashboardThemeConfig),
}

export default dashboardTheme
