import React from 'react'
import { UserProvider as AuthUserProvider } from '@supabase/supabase-auth-helpers/react'
import { Props as AuthUserProviderProps } from '@supabase/supabase-auth-helpers/react/components/UserProvider'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import DbUserProvider, {
  UserProviderProps as DbUserProviderProps,
} from './UserProvider'

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
