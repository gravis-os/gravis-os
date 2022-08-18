export { withPageAuth } from '@supabase/auth-helpers-nextjs'

export { default as AuthProvider } from './AuthProvider'
export * from './AuthProvider'

export { default as AuthForm } from './SupabaseUIAuthForm'
export * from './SupabaseUIAuthForm'

export { default as useUser } from './useUser'
export * from './useUser'

export { default as useUserRedirectEffect } from './useUserRedirectEffect'
export * from './useUserRedirectEffect'

export { default as UserContext } from './UserContext'
export * from './UserContext'

export { default as withAuthProvider } from './withAuthProvider'
export * from './withAuthProvider'

// ==============================
// UI
// ==============================
export { default as AuthLayout } from './AuthLayout'
export * from './AuthLayout'

export { default as UnauthorizedBox } from './UnauthorizedBox'
export * from './UnauthorizedBox'

// ==============================
// Forms
// ==============================
export * from './SupabaseAuth'

export { default as RegisterForm } from './RegisterForm'
export * from './RegisterForm'

export { default as LoginForm } from './LoginForm'
export * from './LoginForm'

export { default as ResetPasswordForm } from './ResetPasswordForm'
export * from './ResetPasswordForm'

export { default as RecoverPasswordForm } from './RecoverPasswordForm'
export * from './RecoverPasswordForm'
