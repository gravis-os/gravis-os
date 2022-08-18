import { createContext } from 'react'
import { AuthUser, DbUser } from '@gravis-os/types'

export interface DbUserWithAuthUser extends DbUser {
  authUser: AuthUser
}

export interface UserContextInterface<AppDbUser = any> {
  user?: DbUserWithAuthUser & AppDbUser // DbUser + Authuser mix

  authUserLoading: boolean
  authUser?: AuthUser

  dbUser?: DbUser & AppDbUser
  dbUserLoading: boolean
  dbUserFetching: boolean
  dbUserQueryResult: any

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
