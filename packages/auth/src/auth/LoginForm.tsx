import React from 'react'
import { FormProps } from '@gravis-os/form'
import { useRouter } from 'next/router'
import AuthBox, { AuthBoxProps } from './AuthBox'
import AuthForm from './AuthForm'
import { handleSignIn } from './SupabaseAuth'

export interface LoginFormProps extends Partial<FormProps<any>> {
  redirectTo: string // Success redirect to
  authOptions?: Record<string, unknown>
  boxProps?: Partial<AuthBoxProps>
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const { authOptions, boxProps, redirectTo, ...rest } = props

  const router = useRouter()

  return (
    <AuthBox
      title="Login"
      subtitle="Please log in using your existing credentials."
      {...boxProps}
    >
      <AuthForm
        onSubmit={async (values) => {
          const user = await handleSignIn(values, authOptions)
          if (user) router.push(redirectTo)
        }}
        {...rest}
      />
    </AuthBox>
  )
}

export default LoginForm
