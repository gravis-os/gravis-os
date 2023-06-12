const components = {
  MuiContainer: {
    defaultProps: {
      maxWidth: 'xl' as const,
    },
  },
  MuiLink: {
    defaultProps: {
      color: 'inherit',
      underline: 'hover' as const,
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
      },
    },
  },
}

export default components
