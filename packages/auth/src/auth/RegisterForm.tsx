import React from 'react'

import { FormProps } from '@gravis-os/form'

import AuthBox, { AuthBoxProps } from './AuthBox'
import AuthForm from './AuthForm'
import { handleSignUp } from './SupabaseAuth'
import useUserRedirectEffect from './useUserRedirectEffect'

export interface RegisterFormProps extends Partial<FormProps<any>> {
  authOptions?: Record<string, unknown> & { redirectTo: string }
  boxProps?: Omit<AuthBoxProps, 'children'>
  submitOptions?: Record<string, unknown>
}

const RegisterForm: React.FC<RegisterFormProps> = (props) => {
  const { authOptions, boxProps, submitOptions, ...rest } = props

  useUserRedirectEffect()

  return (
    <AuthBox
      subtitle="Register on the internal platform"
      title="Register"
      {...boxProps}
    >
      <AuthForm
        onSubmit={(values) => handleSignUp(values, authOptions, submitOptions)}
        {...rest}
        submitButtonProps={{ title: 'Register', ...rest?.submitButtonProps }}
      />
    </AuthBox>
  )
}

export default RegisterForm
