import React from 'react'
import { FormProps } from '@gravis-os/form'
import AuthBox, { AuthBoxProps } from './AuthBox'
import AuthForm from './AuthForm'
import { handleSignUp } from './SupabaseAuth'
import useUserRedirectEffect from './useUserRedirectEffect'

export interface RegisterFormProps extends Partial<FormProps<any>> {
  submitOptions?: Record<string, unknown>
  authOptions?: Record<string, unknown> & { redirectTo: string }
  boxProps?: Omit<AuthBoxProps, 'children'>
}

const RegisterForm: React.FC<RegisterFormProps> = (props) => {
  const { submitOptions, authOptions, boxProps, ...rest } = props

  useUserRedirectEffect()

  return (
    <AuthBox
      title="Register"
      subtitle="Register on the internal platform"
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
