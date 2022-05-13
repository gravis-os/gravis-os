import React from 'react'
import { UserProvider as AuthUserProvider } from '@supabase/supabase-auth-helpers/react'
import { Props as AuthUserProviderProps } from '@supabase/supabase-auth-helpers/react/components/UserProvider'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import UserProvider, { UserProviderProps } from './UserProvider'

export interface AuthProviderProps extends UserProviderProps {
  children?: React.ReactNode
  authProps?: AuthUserProviderProps
}

/**
 * @link https://github.com/supabase-community/supabase-auth-helpers/tree/next/examples/nextjs/pages
 * @param props
 * @constructor
 */
const AuthProvider: React.FC<AuthProviderProps> = props => {
  const { children, authProps, ...rest } = props
  return (
    <AuthUserProvider supabaseClient={supabaseClient} {...authProps}>
      <UserProvider {...rest}>{children}</UserProvider>
    </AuthUserProvider>
  )
}

export default AuthProvider
