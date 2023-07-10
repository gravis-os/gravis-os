import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import toast from 'react-hot-toast'
import { AuthUser } from '@gravis-os/types'
import { createClient } from '@supabase/supabase-js'

interface SupabaseAuthOptions {}

// ==============================
// Handle Sign Up
// ==============================
export type HandleSignUp = (
  values: { email: string; password: string },
  authOptions?: SupabaseAuthOptions,
  submitOptions?: { toastSuccessMessage?: string }
) => Promise<AuthUser>

export const handleSignUp: HandleSignUp = async (
  values,
  authOptions = { redirectTo: '' },
  submitOptions = {}
) => {
  const { email, password } = values

  try {
    // we use this to prevent the global supabaseClient
    // from being overidden by NEXT_PUBLIC_SUPABASE_ANON_KEY
    const tempClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
    const onSignUp = await tempClient.auth.signUp(
      {
        email: email?.toLowerCase(),
        password,
      },
      authOptions
    )
    const { error, user: authUser } = onSignUp

    if (error) {
      toast.error('Something went wrong')
      console.error(error)
      return
    }
    toast.success(submitOptions.toastSuccessMessage || 'Successfully Signed Up')

    return authUser
  } catch (err) {
    console.error('Error caught:', err)
  }
}

// ==============================
// Handle Sign In
// ==============================
export type HandleSignIn = (
  values: { email: string; password: string },
  authOptions?: SupabaseAuthOptions
) => Promise<AuthUser>

export const handleSignIn: HandleSignIn = async (
  values,
  authOptions = { redirectTo: '' }
) => {
  const { email, password } = values

  try {
    const onSignIn = await supabaseClient.auth.signIn(
      {
        email: email?.toLowerCase(),
        password,
      },
      authOptions
    )
    const { user: authUser, error } = onSignIn

    if (error) {
      toast.error('Authentication failed')
      console.error(error)
      return
    }

    return authUser
  } catch (err) {
    console.error('Error caught:', err)
  }
}

// ==============================
// Handle Reset Password
// ==============================
export type HandleResetPassword = (
  values: { email: string },
  authOptions?: SupabaseAuthOptions
) => Promise<unknown>

export const handleResetPassword: HandleResetPassword = async (
  values,
  authOptions = { redirectTo: '' }
) => {
  const { email } = values

  if (!email) {
    toast.error('Please enter your email')
    return
  }

  try {
    const onResetPasswordForEmail =
      await supabaseClient.auth.api.resetPasswordForEmail(
        email?.toLowerCase(),
        authOptions
      )
    const { data: user, error } = onResetPasswordForEmail

    if (error) {
      toast.error('Something went wrong')
      console.error(error)
      return
    }
    toast.success('Success')
    return user
  } catch (err) {
    console.error('Error caught:', err)
  }
}

// ==============================
// Handle Recover Password
// ==============================
export type HandleRecoverPassword = (values: {
  accessToken: string
  password: string
}) => Promise<AuthUser>

export const handleRecoverPassword: HandleRecoverPassword = async (values) => {
  const { accessToken, password } = values

  if (!password) {
    toast.error('Please enter your password')
    return
  }

  try {
    const onUpdateUser = await supabaseClient.auth.api.updateUser(accessToken, {
      password,
    })
    const { data: user, error } = onUpdateUser

    if (error) {
      toast.error('Something went wrong')
      console.error(error)
      return
    }

    toast.success('Success')

    return user
  } catch (err) {
    console.error('Error caught:', err)
  }
}
