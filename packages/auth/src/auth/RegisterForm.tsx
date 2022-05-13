import React from 'react'
import { FormProps } from '@gravis-os/form'
import AuthBox, { AuthBoxProps } from './AuthBox'
import AuthForm from './AuthForm'
import { handleSignUp } from './SupabaseAuth'

export interface RegisterFormProps extends Partial<FormProps<any>> {
  submitOptions?: Record<string, unknown>
  authOptions?: Record<string, unknown> & { redirectTo: string }
  boxProps?: AuthBoxProps
}

const RegisterForm: React.FC<RegisterFormProps> = props => {
  const { submitOptions, authOptions, boxProps, ...rest } = props

  return (
    <AuthBox
      title="Register"
      subtitle="Register on the internal platform"
      {...boxProps}
    >
      <AuthForm
        onSubmit={values => handleSignUp(values, authOptions, submitOptions)}
        submitButtonProps={{ children: 'Register' }}
        {...rest}
      />
    </AuthBox>
  )
}

export default RegisterForm
