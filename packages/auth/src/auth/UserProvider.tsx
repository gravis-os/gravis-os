import React, { useEffect } from 'react'
import { QueryOptions, useQuery, useQueryClient } from 'react-query'

import { DbUser } from '@gravis-os/types'
import { CircularProgress } from '@gravis-os/ui'
import { getGuestPaths, isPathMatch } from '@gravis-os/utils'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { useUser as useAuthUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'

import UserContext, { UserContextInterface } from './UserContext'

// Strip out /_workspaces/[workspace] prefix to accurately get the pathname
const getSaasRoutePathname = ({ pathname: injectedPathname, query }) => {
  const pathname = injectedPathname
    .replace('/_workspaces/[workspace]', '')
    .replace(`/_workspaces/${query.workspace}`, '')

  // Fallback to '/' if we're on the workspaces' home route
  return pathname || '/'
}

export interface UserProviderProps {
  authColumnKey?: string
  authRoutes?: UserContextInterface['authRoutes']
  children?: React.ReactNode
  dbUser?: DbUser
  guestPaths?: string[]
  loader?: React.ReactElement
  queryOptions?: QueryOptions<DbUser>
  select?: string // supabaseClient query selector
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
    authColumnKey = 'id',
    authRoutes,
    children,
    dbUser: injectedDbUser,
    guestPaths: injectedGuestPaths = [],
    loader: injectedLoader,
    queryOptions,
    select = '*',
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
      .eq(authColumnKey, authUser.id)
      .single() // TODO@feature: If isAdmin, expose switcheroo here
    if (!data) return
    const dbUser = data
    return dbUser
  }
  const getDbUserFromAuthUserQueryKey = ['get-db-user-from-auth-user-query']
  const dbUserQueryResult = useQuery<DbUser>(
    getDbUserFromAuthUserQueryKey,
    () => fetchDbUserFromAuthUser({ authUser }),
    {
      enabled: Boolean(authUser),
      staleTime: 60_000, // 60s
      ...queryOptions,
    }
  )
  const {
    data: fetchedDbUser,
    isFetching: dbUserFetching,
    isLoading: dbUserLoading,
    refetch: refetchDbUserQuery,
  } = dbUserQueryResult
  /**
   * Fetch dbUser when authUser is available.
   * Only run query once user is logged in.
   */
  useEffect(() => {
    if (
      authUser &&
      !authUserLoading &&
      (!fetchedDbUser || fetchedDbUser?.id !== authUser?.id)
    ) {
      refetchDbUserQuery()
    }
  }, [authUser, fetchedDbUser, authUserLoading, select])

  const dbUser = injectedDbUser || fetchedDbUser

  // Guest auth paths
  const router = useRouter()
  const { pathname: injectedPathname, query } = router

  /**
   * Manage SaaS routes where rewrites are used
   * This is to prevent hydration mismatch issues on SSR
   * when using in SaaS appp with rewrites to correctly
   * detect the guest paths.
   */
  const isSaaSRoute = injectedPathname.includes('/_workspaces')

  const pathname = isSaaSRoute
    ? getSaasRoutePathname({ pathname: injectedPathname, query })
    : injectedPathname

  const guestPaths = getGuestPaths(injectedGuestPaths)
  const isGuestPath = isPathMatch(pathname, guestPaths)

  // Loader
  const shouldShowLoader = !isGuestPath && !dbUser
  const loader = injectedLoader || (
    <CircularProgress fullScreen id="UserProvider-CircularProgress" />
  )

  // Auth Context methods
  const logout = async () => {
    /**
     * Trigger supabase auth logout instead of js package logout to ensure that
     * cookies are removed as well because the method: supabaseClient.auth.signOut()
     * doesn't seem to clear the cookies.
     */
    await fetch('/api/auth/logout')
    await Promise.all([
      /**
       * Need to fire the API signOut as well to get authUser from useAuthUser
       * to reset properly, else it will still linger on and cause side-effects.
       */
      supabaseClient.auth.signOut(),
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
        // Routes
        authRoutes: {
          authenticationFailureRedirect: '/auth/login',
          authenticationSuccessRedirect: '/admin',
          authorizationFailureRedirect: '/auth/unauthorized',
          authorizationSuccessRedirect: '/admin',
          ...authRoutes,
        },
        // Users
        authUser,

        authUserLoading,

        dbUser,
        dbUserFetching,
        dbUserLoading,
        dbUserQueryResult,
        // Methods
        logout,

        refetchDbUserQuery,
        user: nextUser,
      }}
      {...rest}
    >
      {shouldShowLoader ? loader : children}
    </UserContext.Provider>
  )
}

export default UserProvider
