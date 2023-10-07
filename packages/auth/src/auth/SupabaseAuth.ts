import toast from 'react-hot-toast'

import { AuthUser } from '@gravis-os/types'
import isEmpty from 'lodash/isEmpty'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabase = createClientComponentClient()

export interface SupabaseAuthOptions {}

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
  authOptions = {},
  submitOptions = {}
) => {
  const { email, password } = values

  try {
    const onSignUp = await supabase.auth.signUp({
      email: email?.toLowerCase(),
      options: authOptions,
      password,
    })
    const {
      data: { user: authUser },
      error,
    } = onSignUp

    if (error) {
      toast.error('Something went wrong')
      console.error(error)
      return
    }
    toast.success(submitOptions.toastSuccessMessage || 'Successfully Signed Up')

    return authUser
  } catch (error) {
    console.error('Error caught:', error)
  }
}

// ==============================
// Handle Sign In
// ==============================
export type HandleSignIn = (
  values: { email: string; password: string },
  authOptions?: SupabaseAuthOptions
) => Promise<AuthUser>

export const handleSignIn: HandleSignIn = async (values, authOptions = {}) => {
  const { email, password } = values

  try {
    const onSignIn = await supabase.auth.signInWithPassword({
      email: email?.toLowerCase(),
      options: authOptions,
      password,
    })
    const {
      data: { user: authUser },
      error,
    } = onSignIn

    if (error) {
      toast.error('Authentication failed')
      console.error(error)
      return
    }

    return authUser
  } catch (error) {
    console.error('Error caught:', error)
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
  authOptions = {}
) => {
  const { email } = values

  if (!email) {
    toast.error('Please enter your email')
    return
  }

  try {
<<<<<<< HEAD
    // Supabase will not check if user exists before sent reset password emails, we need handle it internally
    const { data: existedUsers, error: queryUserError } = await supabaseClient
      .from('user')
      .select('id')
      .eq('email', email?.toLowerCase())

    if (isEmpty(existedUsers)) {
      toast.error('User not found')
      return
    }

    if (queryUserError) {
      toast.error('Something went wrong')
      console.error(queryUserError)
      return
    }

    const onResetPasswordForEmail =
      await supabaseClient.auth.api.resetPasswordForEmail(
        email?.toLowerCase(),
        authOptions
      )
=======
    const onResetPasswordForEmail = await supabase.auth.resetPasswordForEmail(
      email?.toLowerCase(),
      authOptions
    )
>>>>>>> 25e35fd7 (refactor: complete supabase and auth helpers migration guides and pass build)
    const { data: user, error } = onResetPasswordForEmail

    if (error) {
      toast.error('Something went wrong')
      console.error(error)
      return
    }
    toast.success('Success')
    return user
  } catch (error) {
    console.error('Error caught:', error)
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
  const { password } = values

  if (!password) {
    toast.error('Please enter your password')
    return
  }

  try {
    const onUpdateUser = await supabase.auth.updateUser({
      password,
    })
    const {
      data: { user },
      error,
    } = onUpdateUser

    if (error) {
      toast.error(error.message)
      throw error
    }

    toast.success('Success')

    return user
  } catch (error) {
    console.error('Error caught:', error)
  }
}
