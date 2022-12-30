import React, { ReactNode, useMemo } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import {
  createTheme,
  ThemeOptions,
  ThemeProvider as MuiThemeProvider,
  PaletteOptions,
} from '@mui/material/styles'
import getPalette from './getPalette'

const defaultTheme = createTheme()

export interface ThemeProviderProps {
  // Infra
  children?: ReactNode | ReactNode[]
  /**
   * Initialised on client-side by default.
   * But pass in server-side cache for SSR styles
   */
  emotionCache?: EmotionCache

  /**
   * ThemeOptions not Theme
   * as Theme will be constructed from ThemeOptions
   */
  theme?: ThemeOptions

  /**
   * Palette mode
   * @default 'light'
   */
  mode?: 'light' | 'dark'
  primaryColor?: string
  secondaryColor?: string
  lightPalette?: PaletteOptions
  darkPalette?: PaletteOptions
}

const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {
  const {
    // Infra
    children,
    emotionCache,

    // Theme
    theme: themeOptions = defaultTheme,

    // Palette
    mode = 'light',
    lightPalette,
    darkPalette,
    primaryColor,
    secondaryColor,
  } = props

  const theme = useMemo(() => {
    const themeWithPalette = getPalette({
      themeOptions,
      paletteOptions:
        !lightPalette || !darkPalette
          ? (themeOptions.palette as PaletteOptions)
          : mode === 'light'
          ? lightPalette
          : darkPalette,
      primaryColorOverride: primaryColor,
      secondaryColorOverride: secondaryColor,
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
