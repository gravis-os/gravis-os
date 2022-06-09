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
      title="Reset Password"
      subtitle="Enter your email address and we will send you a link to reset your password."
      {...boxProps}
    >
      <AuthForm
        fields={['email']}
        onSubmit={(values) => handleResetPassword(values, authOptions)}
        submitButtonProps={{ children: 'Reset Password' }}
        {...rest}
      />
    </AuthBox>
  )
}

export default ResetPasswordForm
