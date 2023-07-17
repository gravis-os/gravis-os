import React, { createContext, useEffect, useState } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import { DEFAULT_THEME_MODE_ENUM } from '@gravis-os/types'
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
  defaultThemeMode?: DEFAULT_THEME_MODE_ENUM
}

export interface RestoreSettingsOptions {
  defaultThemeMode?: SettingsProviderProps['defaultThemeMode']
}

const initialSettings: Settings = {
  direction: 'ltr',
  responsiveFontSizes: true,
  theme: 'light',
}

const getComputedThemeSetting = (defaultThemeMode: DEFAULT_THEME_MODE_ENUM) => {
  switch (defaultThemeMode) {
    case DEFAULT_THEME_MODE_ENUM.DARK:
    case DEFAULT_THEME_MODE_ENUM.LIGHT:
      return { theme: defaultThemeMode }
    case DEFAULT_THEME_MODE_ENUM.SYSTEM:
      return {
        theme: globalThis.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light',
      }
    case DEFAULT_THEME_MODE_ENUM.USER_LOCAL_STORAGE:
    default:
      return { theme: DEFAULT_THEME_MODE_ENUM.LIGHT }
  }
}

const restoreSettings = (
  options: RestoreSettingsOptions = {}
): Settings | null => {
  let settings: any = null
  const { defaultThemeMode } = options
  try {
    const storedData: string | null =
      globalThis.localStorage.getItem('settings')

    const computedThemeSetting = getComputedThemeSetting(defaultThemeMode)

    settings = {
      direction: 'ltr',
      responsiveFontSizes: true,
      ...JSON.parse(storedData),
      ...computedThemeSetting,
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
  const { children, defaultThemeMode } = props
  const [settings, setSettings] = useState<Settings>(initialSettings)

  // @link: https://mui.com/material-ui/customization/dark-mode/#system-preference
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  useEffect(() => {
    const restoredSettings = restoreSettings({ defaultThemeMode })

    if (restoredSettings) {
      setSettings(restoredSettings)
    }
  }, [prefersDarkMode])

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
