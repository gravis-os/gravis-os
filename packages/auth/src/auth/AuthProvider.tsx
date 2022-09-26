import React from 'react'
import { UserProvider as AuthUserProvider } from '@supabase/auth-helpers-react'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import type { User, SupabaseClient } from '@supabase/supabase-js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
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
 * Make a mock queryClient that will take the app's outerscope query client context instead
 * to fix issues with `Error: No QueryClient set, use QueryClientProvider to set one`
 * in react-query v4.6.0.
 * @issue https://github.com/TanStack/query/issues/3595
 */
const queryClient = new QueryClient()

/**
 * @link https://github.com/supabase-community/supabase-auth-helpers/tree/next/examples/nextjs/pages
 * @param props
 * @constructor
 */
const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const { children, authProps, ...rest } = props
  return (
    <QueryClientProvider client={queryClient} contextSharing>
      <AuthUserProvider supabaseClient={supabaseClient} {...authProps}>
        <DbUserProvider {...rest}>{children}</DbUserProvider>
      </AuthUserProvider>
    </QueryClientProvider>
  )
}

export default AuthProvider
