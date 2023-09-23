import React from 'react'

import { FormProps } from '@gravis-os/form'

import AuthBox, { AuthBoxProps } from './AuthBox'
import AuthForm from './AuthForm'
import { handleResetPassword } from './SupabaseAuth'

export interface ResetPasswordFormProps extends Partial<FormProps<any>> {
  authOptions: Record<string, unknown> & { redirectTo: string }
  boxProps?: AuthBoxProps
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = (props) => {
  const { authOptions, boxProps, ...rest } = props

  return (
    <AuthBox
      subtitle="Enter your email address and we will send you a link to reset your password."
      title="Reset Password"
      {...boxProps}
    >
      <AuthForm
        fields={['email']}
        onSubmit={(values) => handleResetPassword(values, authOptions)}
        {...rest}
        submitButtonProps={{
          title: 'Reset Password',
          ...rest?.submitButtonProps,
        }}
      />
    </AuthBox>
  )
}

export default ResetPasswordForm
