import React from 'react'
import { FormProps } from '@gravis-os/form'
import AuthBox, { AuthBoxProps } from './AuthBox'
import AuthForm from './AuthForm'
import { handleSignIn } from './SupabaseAuth'
import useUserRedirectEffect from './useUserRedirectEffect'

export interface LoginFormProps extends Partial<FormProps<any>> {
  authOptions?: Record<string, unknown>
  boxProps?: Partial<AuthBoxProps>
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const { authOptions, boxProps, ...rest } = props

  useUserRedirectEffect()

  return (
    <AuthBox
      title="Login"
      subtitle="Please log in using your existing credentials."
      {...boxProps}
    >
      <AuthForm
        onSubmit={(values) => handleSignIn(values, authOptions)}
        {...rest}
        submitButtonProps={{
          title: 'Login',
          variant: 'contained',
          color: 'primary',
          fullWidth: true,
          ...rest?.submitButtonProps,
        }}
      />
    </AuthBox>
  )
}

export default LoginForm
