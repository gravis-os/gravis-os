import React from 'react'
import { UserProvider as AuthUserProvider } from '@supabase/auth-helpers-react'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import type { User, SupabaseClient } from '@supabase/supabase-js'
import DbUserProvider, {
  UserProviderProps as DbUserProviderProps,
} from './UserProvider'

export interface AuthUserProviderProps {
  supabaseClient: SupabaseClient
  callbackUrl?: string
  profileUrl?: string
  user?: User
  fetcher?: any
  autoRefreshToken?: boolean
  [propName: string]: any
}

export interface AuthProviderProps extends DbUserProviderProps {
  children?: React.ReactNode
  authProps?: AuthUserProviderProps
}

/**
 * @link https://github.com/supabase-community/supabase-auth-helpers/tree/next/examples/nextjs/pages
 * @param props
 * @constructor
 */
const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const { children, authProps, ...rest } = props
  return (
    <AuthUserProvider supabaseClient={supabaseClient} {...authProps}>
      <DbUserProvider {...rest}>{children}</DbUserProvider>
    </AuthUserProvider>
  )
}

export default AuthProvider
