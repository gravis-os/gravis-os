import React, { useEffect, useState } from 'react'
import { useUser as useAuthUser } from '@supabase/supabase-auth-helpers/react'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
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

  // Fetch dbUser
  useEffect(() => {
    async function fetchDbUser() {
      const { data } = await supabaseClient
        .from('user')
        .select(select)
        .eq('id', authUser.id)

      // Set dbUser
      if (data) setDbUser(data[0])
    }
    // Only run query once user is logged in.
    if (
      authUser &&
      !loadingAuthUser &&
      (!dbUser || dbUser?.id !== authUser?.id)
    ) {
      fetchDbUser()
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
    const onSignOut = await supabaseClient.auth.signOut()
    setDbUser(null)
    return onSignOut
  }

  return (
    <UserContext.Provider
      value={{
        ...useAuthUserRest,
        authUser,
        user: dbUser,
        logout,
      }}
      {...rest}
    >
      {shouldShowLoader ? loader : children}
    </UserContext.Provider>
  )
}

export default UserProvider
