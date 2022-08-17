import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import toast from 'react-hot-toast'

interface SupabaseAuthOptions {}
interface SupabaseUser {}

// ==============================
// Handle Sign Up
// ==============================
export type HandleSignUp = (
  values: { email: string; password: string },
  authOptions?: SupabaseAuthOptions,
  submitOptions?: { toastSuccessMessage?: string }
) => SupabaseUser

export const handleSignUp: HandleSignUp = async (
  values,
  authOptions = { redirectTo: '' },
  submitOptions = {}
) => {
  const { email, password } = values

  try {
    const onSignUp = await supabaseClient.auth.signUp(
      {
        email,
        password,
      },
      authOptions
    )
    const { error, user } = onSignUp

    if (error) {
      toast.error('Something went wrong')
      console.error(error)
      return
    }
    toast.success(submitOptions.toastSuccessMessage || 'Successfully Signed Up')
    return user
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
) => SupabaseUser

export const handleSignIn: HandleSignIn = async (
  values,
  authOptions = { redirectTo: '' }
) => {
  const { email, password } = values

  try {
    const onSignIn = await supabaseClient.auth.signIn(
      {
        email,
        password,
      },
      authOptions
    )
    const { user: authUser, error } = onSignIn

    if (error) {
      toast.error('Something went wrong')
      console.error(error)
      return
    }

    toast.success('Successfully signed in')

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
) => SupabaseUser

export const handleResetPassword: HandleResetPassword = async (
  values,
  authOptions = { redirectTo: '' }
) => {
  const { email } = values
  if (!email) return toast.error('Please enter your email')

  try {
    const onResetPasswordForEmail =
      await supabaseClient.auth.api.resetPasswordForEmail(email, authOptions)
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
}) => SupabaseUser

export const handleRecoverPassword: HandleRecoverPassword = async (values) => {
  const { accessToken, password } = values
  if (!password) return toast.error('Please enter your password')

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
