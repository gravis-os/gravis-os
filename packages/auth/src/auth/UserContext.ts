import { createContext } from 'react'
import { AuthUser } from '@gravis-os/types'

export interface UserContextInterface {
  user?: any // DbUser + Authuser mix
  authUser?: AuthUser
  dbUser?: Record<string, unknown>
  fetchAndSetDbUserFromAuthUser: ({
    authUser,
  }: {
    authUser: AuthUser
  }) => Promise<Record<string, unknown>>
  logout: () => Promise<boolean>
  authRoutes?: {
    authenticationSuccessRedirect?: string
    authenticationFailureRedirect?: string
    authorizationSuccessRedirect?: string
    authorizationFailureRedirect?: string
  }
}

const UserContext = createContext<UserContextInterface | null>(null)

export default UserContext
