import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { useEffect } from 'react'
import useUser from './useUser'
import { ROLE_ADMIN, ROLE_SUPER_ADMIN } from '../constants'

/**
 * Redirects the user to the success path after retrieving the authUser
 * and dbUser.
 */
const useUserRedirectEffect = () => {
  const onUseUser = useUser()

  const { authRoutes, authUser, dbUser, dbUserFetching } = onUseUser

  const router = useRouter()

  const handleRedirect = () => {
    // Important to return out to prevent multiple useEffect calls
    // Important to use dbUserFetching instead of dbUserLoading
    if (dbUserFetching) return

    // Outcome: No db user
    if (authUser && !dbUser && !dbUserFetching) {
      return toast.error('User not found')
    }

    // If dbUser check if there is a workspace to redirectTo
    const { workspace, role } = dbUser?.person?.[0] || {}
    if (workspace) {
      const nakedHostname = window.location.hostname.replace('www.', '')
      const isCorrectWorkspace =
        typeof window !== 'undefined' &&
        workspace.slug === nakedHostname.split('.')[0]

      // Outcome: Invalid workspace
      const roleTitle = role?.title
      const isAdmin = roleTitle === ROLE_SUPER_ADMIN || roleTitle === ROLE_ADMIN
      if (!isCorrectWorkspace && !isAdmin) {
        return toast.error('Invalid Workspace')
      }

      // Outcome: Workspace Login
      toast.success('Successfully signed into workspace')

      // Redirect existing users to the dashboard if already logged in
      // Check if the user role has a custom redirect route
      const successRedirectRoute =
        role?.authentication_success_redirect_route ||
        authRoutes.authenticationSuccessRedirect
      return router.push(
        `/_workspaces/[workspace]${successRedirectRoute}`,
        successRedirectRoute
      )
    }

    // Outcome: Default Login for apps without workspace
    toast.success('Successfully signed in')
    return router.push(authRoutes.authenticationSuccessRedirect)
  }

  useEffect(() => {
    if (dbUser) handleRedirect()
  }, [dbUser])
}

export default useUserRedirectEffect
