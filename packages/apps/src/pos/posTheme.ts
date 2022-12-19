import posConfig from './posConfig'

const posTheme = {
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        color: 'inherit',
        size: 'large',
      },
      styleOverrides: {
        root: {
          minHeight: posConfig.buttonMinHeight,
          minWidth: posConfig.buttonMinWidth,
          fontSize: posConfig.buttonFontSize,
        },
      },
    },
  },
}

export default posTheme
