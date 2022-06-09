import React from 'react'
import { useRouter } from 'next/router'
import { FormProps } from '@gravis-os/form'
import AuthBox, { AuthBoxProps } from './AuthBox'
import AuthForm from './AuthForm'
import { handleRecoverPassword } from './SupabaseAuth'

export interface RecoverPasswordFormProps extends Partial<FormProps<any>> {
  redirectTo: string // Auth Redirect on Success
  boxProps?: AuthBoxProps
}

const RecoverPasswordForm: React.FC<RecoverPasswordFormProps> = (props) => {
  const { redirectTo, boxProps, ...rest } = props

  // Get access token from query params
  const router = useRouter()
  const { asPath } = router
  // @example asPath "/auth/recover-password#access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjUwNjAwOTE3LCJzdWIiOiI0NzRlYmY1OC1lZWVmLTQ5MzktYTQ1Yy0zOWZhZjAxZmE3ODMiLCJlbWFpbCI6ImRldkBvbmV4dGVjaC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7fSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQifQ.o4HYZbAGdbguEzdGIjEtpOv_R2YE32tjtua1DhCB2YY&expires_in=3600&refresh_token=6pRs7FReUayNM9iVgkQw_g&token_type=bearer&type=recovery"
  const accessToken = asPath.split('&')[0].split('#access_token=')[1]

  return (
    <AuthBox
      title="Recover Password"
      subtitle="Enter a new password for your account."
      {...boxProps}
    >
      <AuthForm
        fields={['password']}
        onSubmit={async (values) => {
          const user = await handleRecoverPassword({ accessToken, ...values })
          return router.push(redirectTo)
        }}
        submitButtonProps={{ children: 'Set New Password' }}
        {...rest}
      />
    </AuthBox>
  )
}

export default RecoverPasswordForm
