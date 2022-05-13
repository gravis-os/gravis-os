import React from 'react'
import { FormProps } from '@gravis-os/form'
import AuthBox, { AuthBoxProps } from './AuthBox'
import AuthForm from './AuthForm'
import { handleSignIn } from './SupabaseAuth'

export interface LoginFormProps extends Partial<FormProps<any>> {
  authOptions?: Record<string, unknown>
  boxProps?: Partial<AuthBoxProps>
}

const LoginForm: React.FC<LoginFormProps> = props => {
  const { authOptions, boxProps, ...rest } = props

  return (
    <AuthBox
      title="Login"
      subtitle="Please log in using your existing credentials."
      {...boxProps}
    >
      <AuthForm
        onSubmit={values => handleSignIn(values, authOptions)}
        {...rest}
      />
    </AuthBox>
  )
}

export default LoginForm
