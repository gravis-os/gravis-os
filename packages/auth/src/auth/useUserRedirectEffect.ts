import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { useEffect } from 'react'
import useUser from './useUser'

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
      const isCorrectWorkspace =
        typeof window !== 'undefined' &&
        workspace.slug === window.location.hostname.split('.')[0]

      // Outcome: Invalid workspace
      const roleTitle = role?.title
      const isAdmin = roleTitle === 'Super Admin' || roleTitle === 'Admin'
      if (!isCorrectWorkspace && !isAdmin) {
        return toast.error('Invalid Workspace')
      }

      // Outcome: Workspace Login
      toast.success('Successfully signed into workspace')
      return router.push(
        `/_workspaces/[workspace]${authRoutes.authenticationSuccessRedirect}`,
        authRoutes.authenticationSuccessRedirect
      )
    }

    // Outcome: Default Login for apps without workspace
    toast.success('Successfully signed in')
    return router.push(authRoutes.authenticationSuccessRedirect)
  }

  useEffect(() => {
    if (authUser) handleRedirect()
  }, [authUser, dbUser, dbUserFetching, authRoutes])
}

export default useUserRedirectEffect
