// Authy stuff
export { useUser as useAuthUser } from '@supabase/auth-helpers-react'

export { withPageAuth } from '@supabase/auth-helpers-nextjs'

export { default as AuthProvider } from './AuthProvider'
export * from './AuthProvider'

export { default as AuthForm } from './SupabaseUIAuthForm'
export * from './SupabaseUIAuthForm'

export { default as useUser } from './useUser'
export * from './useUser'

export { default as useAuth } from './useAuth'
export * from './useAuth'

export { default as withAuthProvider } from './withAuthProvider'
export * from './withAuthProvider'

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
