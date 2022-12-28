import React from 'react'
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  Theme,
} from '@mui/material/styles'
import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'

const defaultTheme = createTheme()

export interface ThemeProviderProps {
  children: React.ReactNode
  emotionCache?: EmotionCache
  theme?: Theme
}

const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {
  const { theme: injectedTheme, emotionCache, children } = props
  const theme = injectedTheme || defaultTheme

  return (
    <CacheProvider value={emotionCache}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </CacheProvider>
  )
}

export default ThemeProvider
