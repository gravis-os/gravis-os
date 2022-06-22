const baseTheme = {
  typography: {
    h1: {
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: 1.375,
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.375,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.375,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.375,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.375,
    },
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
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.75,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.57,
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '0.5px',
      lineHeight: 1.25,
      textTransform: 'uppercase',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.66,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
}

const themeConfig = {
  theme: {
    light: baseTheme,
    dark: baseTheme,
  },
}

export default themeConfig
