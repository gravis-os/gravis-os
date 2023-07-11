import React, { createContext, useEffect, useState } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { IconButton } from '@mui/material'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import { DEFAULT_THEME_MODE_ENUM } from '@gravis-os/types'

export interface UserPreferences {
  direction?: 'ltr' | 'rtl'
  responsiveFontSizes?: boolean
  mode: 'light' | 'dark'
  isDarkSidebar?: boolean
}

export interface UserPreferencesContextValue {
  userPreferences: UserPreferences
  saveUserPreferences: (update: UserPreferences) => void
  isDarkMode: boolean
  handleToggleDarkMode: () => void
  handleToggleDarkSidebar: () => void
  toggleDarkModeIconButtonJsx: React.ReactElement
}

export interface UserPreferencesProviderProps {
  children?: React.ReactNode
  defaultThemeMode?: DEFAULT_THEME_MODE_ENUM
}

export interface RestoreUserPreferencesOptions {
  defaultThemeMode?: UserPreferencesProviderProps['defaultThemeMode']
}

const initialUserPreferences: UserPreferences = {
  direction: 'ltr',
  responsiveFontSizes: true,
  mode: 'light',
  isDarkSidebar: false,
}

const getComputedThemeSetting = (defaultThemeMode: DEFAULT_THEME_MODE_ENUM) => {
  switch (defaultThemeMode) {
    case DEFAULT_THEME_MODE_ENUM.DARK:
    case DEFAULT_THEME_MODE_ENUM.LIGHT:
      return { mode: defaultThemeMode }
    case DEFAULT_THEME_MODE_ENUM.SYSTEM:
      return {
        mode: globalThis.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light',
      }
    default:
      return {}
  }
}

const restoreUserPreferences = (
  options: RestoreUserPreferencesOptions = {}
): UserPreferences | null => {
  let userPreferences: any = null
  const { defaultThemeMode } = options
  try {
    const storedData: string | null =
      globalThis.localStorage.getItem('userPreferences')

    const computedThemeSetting = getComputedThemeSetting(defaultThemeMode)

    userPreferences = {
      ...initialUserPreferences,
      ...JSON.parse(storedData),
      // Allow to overriding of the mode with the system preference
      ...computedThemeSetting,
    }
  } catch (err) {
    console.error(err)
    // If stored data is not a strigified JSON this will fail,
    // that's why we catch the error
  }

  return userPreferences
}

const storeUserPreferences = (userPreferences: UserPreferences): void => {
  globalThis.localStorage.setItem(
    'userPreferences',
    JSON.stringify(userPreferences)
  )
}

export const UserPreferencesContext =
  createContext<UserPreferencesContextValue>({
    userPreferences: initialUserPreferences,
    saveUserPreferences: () => null,
    isDarkMode: false,
    handleToggleDarkMode: () => null,
    handleToggleDarkSidebar: () => null,
    toggleDarkModeIconButtonJsx: null,
  })

export const UserPreferencesConsumer = UserPreferencesContext.Consumer

export const useUserPreferences = () => {
  return React.useContext(UserPreferencesContext)
}

/**
 * UserPreferencesProvider
 * @param props
 * @constructor
 * @example
 * <UserPreferencesProvider>
 *   <UserPreferencesConsumer>
 *     {({ userPreferences }) => (
 *       <ThemeProvider mode={getAdminTheme(userPreferences.mode)}>
 *         <CssBaseline />
 *           <Component {...pageProps} />
 *       </ThemeProvider>
 *     )}
 *   </UserPreferencesConsumer>
 * </UserPreferencesProvider>
 */
const UserPreferencesProvider: React.FC<UserPreferencesProviderProps> = (
  props
) => {
  const { children, defaultThemeMode } = props
  const [userPreferences, setUserPreferences] = useState<UserPreferences>(
    initialUserPreferences
  )

  // @link: https://mui.com/material-ui/customization/dark-mode/#system-preference
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  useEffect(() => {
    const restoredUserPreferences = restoreUserPreferences({
      defaultThemeMode,
    })

    if (restoredUserPreferences) {
      setUserPreferences(restoredUserPreferences)
    }
  }, [prefersDarkMode])

  const saveUserPreferences = (
    updatedUserPreferences: UserPreferences
  ): void => {
    setUserPreferences(updatedUserPreferences)
    storeUserPreferences(updatedUserPreferences)
  }

  const isDarkMode = userPreferences.mode === 'dark'

  const handleToggleDarkMode = () => {
    return saveUserPreferences({
      ...userPreferences,
      mode: isDarkMode ? 'light' : 'dark',
    })
  }
  const handleToggleDarkSidebar = () => {
    return saveUserPreferences({
      ...userPreferences,
      isDarkSidebar: !userPreferences.isDarkSidebar,
    })
  }
  const toggleDarkModeIconButtonJsx = (
    <IconButton
      onClick={handleToggleDarkMode}
      color="inherit"
      aria-label="toggle color mode"
    >
      {isDarkMode ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
    </IconButton>
  )

  return (
    <UserPreferencesContext.Provider
      value={{
        userPreferences,
        saveUserPreferences,
        isDarkMode,
        handleToggleDarkMode,
        handleToggleDarkSidebar,
        toggleDarkModeIconButtonJsx,
      }}
    >
      {children}
    </UserPreferencesContext.Provider>
  )
}

export default UserPreferencesProvider
