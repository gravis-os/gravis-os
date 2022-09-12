import React, { useEffect } from 'react'
import { useUser as useAuthUser } from '@supabase/auth-helpers-react'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/router'
import { CircularProgress } from '@gravis-os/ui'
import { useQuery, useQueryClient } from 'react-query'
import { DbUser } from '@gravis-os/types'
import UserContext, { UserContextInterface } from './UserContext'

export interface UserProviderProps {
  select?: string // supabaseClient query selector
  children?: React.ReactNode
  loader?: React.ReactElement
  guestPaths?: string[]
  authRoutes?: UserContextInterface['authRoutes']
  setUser?: ({
    user,
  }: {
    user?: UserContextInterface['user']
  }) => UserContextInterface['user']
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
    authRoutes,
    setUser,
    ...rest
  } = props

  const queryClient = useQueryClient()
  const onUseAuthUser = useAuthUser()
  const { user: authUser, ...useAuthUserRest } = onUseAuthUser
  const { isLoading: authUserLoading } = useAuthUserRest

  // ==============================
  // Methods
  // ==============================
  const fetchDbUserFromAuthUser = async ({ authUser }) => {
    if (!authUser) return
    const { data } = await supabaseClient
      .from('user')
      .select(select)
      .eq('id', authUser.id) // Feature: If isAdmin, expose switcheroo here
    if (!data) return
    const dbUser = data[0]
    return dbUser
  }
  const getDbUserFromAuthUserQueryKey = 'get-db-user-from-auth-user-query'
  const dbUserQueryResult = useQuery<DbUser>(
    getDbUserFromAuthUserQueryKey,
    () => fetchDbUserFromAuthUser({ authUser }),
    { enabled: Boolean(authUser) }
  )
  const {
    data: dbUser,
    refetch: refetchDbUserQuery,
    isLoading: dbUserLoading,
    isFetching: dbUserFetching,
  } = dbUserQueryResult
  /**
   * Fetch dbUser when authUser is available.
   * Only run query once user is logged in.
   */
  useEffect(() => {
    if (
      authUser &&
      !authUserLoading &&
      (!dbUser || dbUser?.id !== authUser?.id)
    ) {
      refetchDbUserQuery()
    }
  }, [authUser, dbUser, authUserLoading, select])

  // Guest auth paths
  const router = useRouter()
  const { asPath } = router
  const guestPaths = ['/', '/auth/*', ...injectedGuestPaths]
  const isGuestPath = guestPaths.some((whitelistPath) => {
    const hasWildcard = whitelistPath.includes('*')
    return hasWildcard
      ? asPath.startsWith(whitelistPath.split('/*')[0])
      : whitelistPath === asPath
  })

  // Loader
  const shouldShowLoader = !isGuestPath && (authUserLoading || !dbUser)
  const loader = injectedLoader || <CircularProgress fullScreen />

  // Auth Context methods
  const logout = async () => {
    await Promise.all([
      /**
       * Need to fire the API signOut as well to get authUser from useAuthUser
       * to reset properly, else it will still linger on and cause side-effects.
       */
      supabaseClient.auth.signOut(),
      /**
       * Trigger supabase auth logout instead of js package logout to ensure that
       * cookies are removed as well because the previous method: supabaseClient.auth.signOut()
       * didn't seem to clear the cookies.
       */
      fetch('/api/auth/logout'),
      // Unset dbUser by refetching again but this time without the authUser
      queryClient.invalidateQueries(getDbUserFromAuthUserQueryKey),
    ])

    return true
  }

  const nextUser =
    typeof setUser === 'function'
      ? setUser({ user: { ...dbUser, authUser } })
      : { ...dbUser, authUser }

  return (
    <UserContext.Provider
      value={{
        ...onUseAuthUser,
        // Users
        authUser,
        authUserLoading,

        user: nextUser,

        dbUser,
        dbUserLoading,
        dbUserFetching,
        dbUserQueryResult,
        refetchDbUserQuery,

        // Methods
        logout,
        // Routes
        authRoutes: {
          authenticationSuccessRedirect: '/admin',
          authenticationFailureRedirect: '/auth/login',
          authorizationSuccessRedirect: '/admin',
          authorizationFailureRedirect: '/auth/unauthorized',
          ...authRoutes,
        },
      }}
      {...rest}
    >
      {shouldShowLoader ? loader : children}
    </UserContext.Provider>
  )
}

export default UserProvider
