import type { SupabaseClient, User } from '@supabase/supabase-js'

import React from 'react'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

import DbUserProvider, {
  UserProviderProps as DbUserProviderProps,
} from './UserProvider'

const supabase = createClientComponentClient()

export interface AuthUserProviderProps {
  // TODO: Refactor this
  [propName: string]: any
  autoRefreshToken?: boolean
  callbackUrl?: string
  fetcher?: any
  profileUrl?: string
  supabase: SupabaseClient
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
    <SessionContextProvider supabaseClient={supabase} {...authProps}>
      <DbUserProvider {...rest}>{children}</DbUserProvider>
    </SessionContextProvider>
  )
}

export default AuthProvider
