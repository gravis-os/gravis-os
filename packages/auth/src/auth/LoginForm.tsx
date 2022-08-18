import React from 'react'
import { FormProps } from '@gravis-os/form'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import AuthBox, { AuthBoxProps } from './AuthBox'
import AuthForm from './AuthForm'
import { handleSignIn } from './SupabaseAuth'
import useUser from './useUser'

export interface LoginFormProps extends Partial<FormProps<any>> {
  redirectTo?: string // Success redirect to
  authOptions?: Record<string, unknown>
  boxProps?: Partial<AuthBoxProps>
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const { authOptions, boxProps, redirectTo, ...rest } = props

  const router = useRouter()
  const onUseUser = useUser()
  const { fetchAndSetDbUserFromAuthUser, authRoutes } = onUseUser

  return (
    <AuthBox
      title="Login"
      subtitle="Please log in using your existing credentials."
      {...boxProps}
    >
      <AuthForm
        onSubmit={async (values) => {
          const authUser = await handleSignIn(values, authOptions)
          const dbUser = await fetchAndSetDbUserFromAuthUser({
            authUser,
          })
          // Outcome: No db user
          if (!dbUser) return toast.error('Something went wrong')

          // If dbUser check if there is a workspace to redirectTo
          const { workspace } = dbUser?.person?.[0]
          if (workspace) {
            const isCorrectWorkspace =
              typeof window !== 'undefined' &&
              workspace.slug === window.location.hostname.split('.')[0]

            // Outcome: Invalid workspace
            if (!isCorrectWorkspace) return toast.error('Invalid Workspace')

            toast.success('Successfully signed in')

            // TODO@Joel: See how to get this prefix
            // Outcome: Workspace Login
            return router.push(
              `/_workspaces/[workspace]${authRoutes.authenticationSuccessRedirect}`,
              authRoutes.authenticationSuccessRedirect
            )
          }

          // Outcome: Default Login for apps without workspace
          toast.success('Successfully signed in')
          return router.push(
            redirectTo || authRoutes.authenticationSuccessRedirect
          )
        }}
        submitButtonProps={{ title: 'Login' }}
        {...rest}
      />
    </AuthBox>
  )
}

export default LoginForm
