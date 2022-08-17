import React, { useEffect, useState } from 'react'
import { useUser as useAuthUser } from '@supabase/auth-helpers-react'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/router'
import { CircularProgress } from '@gravis-os/ui'
import UserContext from './UserContext'

export interface UserProviderProps {
  select?: string // supabaseClient query selector
  children?: React.ReactNode
  loader?: React.ReactElement
  guestPaths?: string[]
}

/**
 * DbUserProvider
 * @param props
 * @constructor
 */
const UserProvider: React.FC<UserProviderProps> = (props) => {
  const {
    select = '*',
    children,
    loader: injectedLoader,
    guestPaths: injectedGuestPaths = [],
    ...rest
  } = props

  const onUseAuthUser = useAuthUser()
  const { user: authUser, ...useAuthUserRest } = onUseAuthUser
  const { isLoading: loadingAuthUser } = useAuthUserRest

  // State: dbUser
  const [dbUser, setDbUser] = useState(null)

  const fetchAndSetDbUserFromAuthUser = async ({ authUser }) => {
    const { data } = await supabaseClient
      .from('user')
      .select(select)
      .eq('id', authUser.id)

    if (!data) return

    const dbUser = data[0]

    // Set dbUser
    setDbUser(data[0])

    return dbUser
  }

  // Fetch dbUser
  useEffect(() => {
    // Only run query once user is logged in.
    if (
      authUser &&
      !loadingAuthUser &&
      (!dbUser || dbUser?.id !== authUser?.id)
    ) {
      fetchAndSetDbUserFromAuthUser({ authUser })
    }
  }, [authUser, dbUser, loadingAuthUser, select])

  // Guest auth paths
  const router = useRouter()
  const { pathname } = router
  const guestPaths = ['/', '/auth/*', ...injectedGuestPaths]
  const isGuestPath = guestPaths.some((whitelistPath) => {
    const hasWildcard = whitelistPath.includes('*')
    return hasWildcard
      ? pathname.startsWith(whitelistPath.split('/*')[0])
      : whitelistPath === pathname
  })

  // Loader
  const shouldShowLoader = !isGuestPath && !dbUser
  const loader = injectedLoader || <CircularProgress fullScreen />

  // Auth Context methods
  const logout = async () => {
    /**
     * Trigger supabase auth logout instead of js package logout to ensure that
     * cookies are removed as well because the previous method: supabaseClient.auth.signOut()
     * didn't seem to clear the cookies.
     */
    await fetch('/api/auth/logout', { method: 'POST' })
    /**
     * Need to fire the API signOut as well to get authUser from useAuthUser
     * to reset properly, else it will still linger on and cause side-effects.
     */
    await supabaseClient.auth.signOut()

    // Unset dbUser
    setDbUser(null)

    return true
  }

  return (
    <UserContext.Provider
      value={{
        ...useAuthUserRest,
        authUser,
        user: {
          ...dbUser,
          authUser,
        },
        dbUser,
        fetchAndSetDbUserFromAuthUser: fetchAndSetDbUserFromAuthUser as any,
        logout,
      }}
      {...rest}
    >
      {shouldShowLoader ? loader : children}
    </UserContext.Provider>
  )
}

export default UserProvider
