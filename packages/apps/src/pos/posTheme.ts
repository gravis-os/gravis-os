import posConfig from './posConfig'

const posTheme = {
  components: {
    MuiButton: {
      defaultProps: {
        color: 'inherit',
        size: 'large',
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          fontSize: posConfig.buttonFontSize,
          minHeight: posConfig.buttonMinHeight,
          minWidth: posConfig.buttonMinWidth,
        },
      },
    },
  },
}

export default posTheme
