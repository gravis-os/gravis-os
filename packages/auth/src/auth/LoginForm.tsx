import React, { useEffect } from 'react'
import { FormProps } from '@gravis-os/form'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import AuthBox, { AuthBoxProps } from './AuthBox'
import AuthForm from './AuthForm'
import { handleSignIn } from './SupabaseAuth'
import useUser from './useUser'
import useUserRedirectEffect from './useUserRedirectEffect'

export interface LoginFormProps extends Partial<FormProps<any>> {
  redirectTo?: string // Success redirect to
  authOptions?: Record<string, unknown>
  boxProps?: Partial<AuthBoxProps>
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const { authOptions, boxProps, redirectTo, ...rest } = props

  useUserRedirectEffect()

  return (
    <AuthBox
      title="Login"
      subtitle="Please log in using your existing credentials."
      {...boxProps}
    >
      <AuthForm
        onSubmit={(values) => handleSignIn(values, authOptions)}
        submitButtonProps={{ title: 'Login' }}
        {...rest}
      />
    </AuthBox>
  )
}

export default LoginForm
