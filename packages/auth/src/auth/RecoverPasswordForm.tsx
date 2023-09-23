import React from 'react'

import { FormProps } from '@gravis-os/form'
import { useRouter } from 'next/router'

import AuthBox, { AuthBoxProps } from './AuthBox'
import AuthForm from './AuthForm'
import { handleRecoverPassword } from './SupabaseAuth'

export interface RecoverPasswordFormProps extends Partial<FormProps<any>> {
  boxProps?: AuthBoxProps
  redirectTo: string // Auth Redirect on Success
}

const RecoverPasswordForm: React.FC<RecoverPasswordFormProps> = (props) => {
  const { boxProps, redirectTo, ...rest } = props

  // Get access token from query params
  const router = useRouter()
  const { asPath } = router
  // @example asPath "/auth/recover-password#access_token=eyXXX&expires_in=3600&refresh_token=XXX&token_type=bearer&type=recovery"
  const accessToken = asPath.split('&')[0].split('#access_token=')[1]

  return (
    <AuthBox
      subtitle="Enter a new password for your account."
      title="Recover Password"
      {...boxProps}
    >
      <AuthForm
        fields={['password']}
        onSubmit={async (values) => {
          const user = await handleRecoverPassword({ accessToken, ...values })
          return router.push(redirectTo)
        }}
        {...rest}
        submitButtonProps={{
          title: 'Set New Password',
          ...rest?.submitButtonProps,
        }}
      />
    </AuthBox>
  )
}

export default RecoverPasswordForm
