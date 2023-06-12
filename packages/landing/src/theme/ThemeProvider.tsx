import React from 'react'
import {
  ThemeProvider as GvsThemeProvider,
  ThemeProviderProps as GvsThemeProviderProps,
  useUserPreferences,
} from '@gravis-os/theme'
import importedLightTheme from './lightTheme'
import importedDarkTheme from './darkTheme'

export interface ThemeProviderProps extends GvsThemeProviderProps {
  darkTheme?: GvsThemeProviderProps['theme']
  lightTheme?: GvsThemeProviderProps['theme']
}

const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {
  const {
    darkTheme = importedDarkTheme,
    lightTheme = importedLightTheme,
    children,
    emotionCache,
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
