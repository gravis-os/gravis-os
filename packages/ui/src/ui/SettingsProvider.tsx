import React, { createContext, useEffect, useState } from 'react'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import IconButton from './IconButton'

export interface Settings {
  direction?: 'ltr' | 'rtl'
  responsiveFontSizes?: boolean
  theme: 'light' | 'dark'
}

export interface SettingsContextValue {
  settings: Settings
  saveSettings: (update: Settings) => void
  isDarkMode: boolean
  handleToggleThemeMode: () => void
  toggleDarkModeIconButtonJsx: React.ReactElement
}

export interface SettingsProviderProps {
  children?: React.ReactNode
}

const initialSettings: Settings = {
  direction: 'ltr',
  responsiveFontSizes: true,
  theme: 'light',
}

const restoreSettings = (): Settings | null => {
  let settings: any = null

  try {
    const storedData: string | null =
      globalThis.localStorage.getItem('settings')

    if (storedData) {
      settings = JSON.parse(storedData)
    } else {
      settings = {
        direction: 'ltr',
        responsiveFontSizes: true,
        theme: globalThis.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light',
      }
    }
  } catch (err) {
    console.error(err)
    // If stored data is not a strigified JSON this will fail,
    // that's why we catch the error
  }

  return settings
}

const storeSettings = (settings: Settings): void => {
  globalThis.localStorage.setItem('settings', JSON.stringify(settings))
}

export const SettingsContext = createContext<SettingsContextValue>({
  settings: initialSettings,
  saveSettings: () => null,
  isDarkMode: false,
  handleToggleThemeMode: () => null,
  toggleDarkModeIconButtonJsx: null,
})

export const SettingsConsumer = SettingsContext.Consumer

export const useSettings = () => {
  return React.useContext(SettingsContext)
}

/**
 * SettingsProvider
 * @param props
 * @constructor
 * @example
 * <SettingsProvider>
 *   <SettingsConsumer>
 *     {({ settings }) => (
 *       <ThemeProvider theme={getAdminTheme(settings.theme)}>
 *         <CssBaseline />
 *           <Component {...pageProps} />
 *       </ThemeProvider>
 *     )}
 *   </SettingsConsumer>
 * </SettingsProvider>
 */
const SettingsProvider: React.FC<SettingsProviderProps> = (props) => {
  const { children } = props
  const [settings, setSettings] = useState<Settings>(initialSettings)

  useEffect(() => {
    const restoredSettings = restoreSettings()

    if (restoredSettings) {
      setSettings(restoredSettings)
    }
  }, [])

  const saveSettings = (updatedSettings: Settings): void => {
    setSettings(updatedSettings)
    storeSettings(updatedSettings)
  }

  const isDarkMode = settings.theme === 'dark'

  const handleToggleThemeMode = () => {
    return saveSettings({
      ...settings,
      theme: isDarkMode ? 'light' : 'dark',
    })
  }
  const toggleDarkModeIconButtonJsx = (
    <IconButton onClick={handleToggleThemeMode} color="inherit">
      {isDarkMode ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
    </IconButton>
  )

  return (
    <SettingsContext.Provider
      value={{
        settings,
        saveSettings,
        isDarkMode,
        handleToggleThemeMode,
        toggleDarkModeIconButtonJsx,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export default SettingsProvider
