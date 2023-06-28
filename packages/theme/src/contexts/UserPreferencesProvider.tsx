import React, { createContext, useEffect, useState } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { IconButton } from '@mui/material'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'

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
  shouldSetThemeFromLocalStorage?: boolean
}

export interface RestoreUserPreferencesOptions {
  shouldSetThemeFromLocalStorage?: UserPreferencesProviderProps['shouldSetThemeFromLocalStorage']
}

const initialUserPreferences: UserPreferences = {
  direction: 'ltr',
  responsiveFontSizes: true,
  mode: 'light',
  isDarkSidebar: false,
}

const restoreUserPreferences = (
  options: RestoreUserPreferencesOptions = {}
): UserPreferences | null => {
  let userPreferences: any = null
  const { shouldSetThemeFromLocalStorage } = options
  try {
    const storedData: string | null =
      globalThis.localStorage.getItem('userPreferences')

    const systemThemeSetting = shouldSetThemeFromLocalStorage
      ? {}
      : {
          mode: globalThis.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light',
        }

    userPreferences = {
      ...initialUserPreferences,
      ...JSON.parse(storedData),
      // Allow to overriding of the mode with the system preference
      ...systemThemeSetting,
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
  const { children, shouldSetThemeFromLocalStorage } = props
  const [userPreferences, setUserPreferences] = useState<UserPreferences>(
    initialUserPreferences
  )

  // @link: https://mui.com/material-ui/customization/dark-mode/#system-preference
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  useEffect(() => {
    const restoredUserPreferences = restoreUserPreferences({
      shouldSetThemeFromLocalStorage,
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
