import React from 'react'

import {
  ThemeProvider as GvsThemeProvider,
  ThemeProviderProps as GvsThemeProviderProps,
  useUserPreferences,
} from '@gravis-os/theme'

import importedDarkTheme from './darkTheme'
import importedLightTheme from './lightTheme'

export interface ThemeProviderProps extends GvsThemeProviderProps {
  darkTheme?: GvsThemeProviderProps['theme']
  lightTheme?: GvsThemeProviderProps['theme']
}

const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {
  const {
    children,
    darkTheme = importedDarkTheme,
    emotionCache,
    lightTheme = importedLightTheme,
  } = props

  // User Preferences
  const { isDarkMode } = useUserPreferences()

  return (
    <GvsThemeProvider
      emotionCache={emotionCache}
      theme={isDarkMode ? darkTheme : lightTheme}
    >
      {children}
    </GvsThemeProvider>
  )
}

export default ThemeProvider
