import React from 'react'

import LoginFormComponent from './LoginForm'
import RecoverPasswordFormComponent from './RecoverPasswordForm'
import RegisterFormComponent from './RegisterForm'
import ResetPasswordFormComponent from './ResetPasswordForm'

export default {
  title: 'auth/Auth',
  component: () => <div />,
  decorators: [
    // Layout
    (Story) => (
      <div style={{ margin: '0 auto', width: '50%' }}>
        <Story />
      </div>
    ),
  ],
}

export const LoginForm = (args) => <LoginFormComponent {...args} />
export const RegisterForm = (args) => <RegisterFormComponent {...args} />
export const ResetPasswordForm = (args) => (
  <ResetPasswordFormComponent {...args} />
)
export const RecoverPasswordForm = (args) => (
  <RecoverPasswordFormComponent {...args} />
)
