import type { SupabaseClient, User } from '@supabase/supabase-js'

import React from 'react'

import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { UserProvider as AuthUserProvider } from '@supabase/auth-helpers-react'

import DbUserProvider, {
  UserProviderProps as DbUserProviderProps,
} from './UserProvider'

export interface AuthUserProviderProps {
  [propName: string]: any
  autoRefreshToken?: boolean
  callbackUrl?: string
  fetcher?: any
  profileUrl?: string
  supabaseClient: SupabaseClient
  user?: User
}

export interface AuthProviderProps extends DbUserProviderProps {
  authProps?: AuthUserProviderProps
  children?: React.ReactNode
}

/**
 * @link https://github.com/supabase-community/supabase-auth-helpers/tree/next/examples/nextjs/pages
 * @param props
 * @constructor
 */
const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const { authProps, children, ...rest } = props
  return (
    <AuthUserProvider supabaseClient={supabaseClient} {...authProps}>
      <DbUserProvider {...rest}>{children}</DbUserProvider>
    </AuthUserProvider>
  )
}

export default AuthProvider
