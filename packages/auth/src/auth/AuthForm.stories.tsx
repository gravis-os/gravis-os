import React from 'react'
import LoginFormComponent from './LoginForm'
import RegisterFormComponent from './RegisterForm'
import ResetPasswordFormComponent from './ResetPasswordForm'
import RecoverPasswordFormComponent from './RecoverPasswordForm'

export default {
  title: 'auth/Auth',
  component: () => <div />,
  decorators: [
    // Layout
    Story => (
      <div style={{ width: '50%', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
}

export const LoginForm = args => <LoginFormComponent {...args} />
export const RegisterForm = args => <RegisterFormComponent {...args} />
export const ResetPasswordForm = args => (
  <ResetPasswordFormComponent {...args} />
)
export const RecoverPasswordForm = args => (
  <RecoverPasswordFormComponent {...args} />
)
