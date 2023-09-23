import React, { ReactNode, useMemo } from 'react'

import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import {
  ThemeProvider as MuiThemeProvider,
  PaletteOptions,
  ThemeOptions,
  createTheme,
} from '@mui/material/styles'

import getPalette from './getPalette'

const defaultTheme = createTheme()

export interface ThemeProviderProps {
  // Infra
  children?: ReactNode | ReactNode[]
  darkPalette?: PaletteOptions

  /**
   * Initialised on client-side by default.
   * But pass in server-side cache for SSR styles
   */
  emotionCache?: EmotionCache

  lightPalette?: PaletteOptions
  /**
   * Palette mode
   * @default 'light'
   */
  mode?: 'dark' | 'light'
  primaryColor?: string
  secondaryColor?: string
  /**
   * ThemeOptions not Theme
   * as Theme will be constructed from ThemeOptions
   */
  theme?: ThemeOptions
}

const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {
  const {
    // Infra
    children,
    darkPalette,

    emotionCache,

    lightPalette,
    // Palette
    mode = 'light',
    primaryColor,
    secondaryColor,
    // Theme
    theme: themeOptions = defaultTheme,
  } = props

  const theme = useMemo(() => {
    const themeWithPalette = getPalette({
      paletteOptions:
        // prettier-ignore
        !lightPalette && !darkPalette
          ? (themeOptions.palette as PaletteOptions)
          : (mode === 'light'
          ? lightPalette
          : darkPalette),
      primaryColorOverride: primaryColor,
      secondaryColorOverride: secondaryColor,
      themeOptions,
    })

    return createTheme(themeWithPalette)
  }, [
    themeOptions,
    mode,
    lightPalette,
    darkPalette,
    primaryColor,
    secondaryColor,
  ])

  const childrenJsx = (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )

  return emotionCache ? (
    <CacheProvider value={emotionCache}>{childrenJsx}</CacheProvider>
  ) : (
    childrenJsx
  )
}

export default ThemeProvider
