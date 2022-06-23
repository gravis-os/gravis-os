import baseTheme from '../Base/baseTheme'

const landingTheme = {
  light: {
    ...baseTheme,
    typography: {
      ...baseTheme.typography,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
  },
  dark: baseTheme,
}

export default landingTheme
