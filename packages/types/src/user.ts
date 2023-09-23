// ==============================
// User-Related Models
// ==============================
import { User as GotrueUser } from '@supabase/gotrue-js/dist/module/lib/types'

import { CrudItem } from './crud'

export interface Permission extends CrudItem {}
export interface Role extends CrudItem {
  authentication_success_redirect_route?: string
  permission: Permission[]
  valid_subdirectory_pathnames?: string[]
}
export interface Feature extends CrudItem {}
export interface Tier extends CrudItem {
  feature: Feature[]
  feature_ids: Array<{ title: string }>
}
export interface Workspace extends CrudItem {
  slug: string
  tier: Tier
}
export interface Company extends CrudItem {}
export interface Person extends CrudItem {
  avatar_alt?: string
  avatar_src?: string
  company?: Company
  first_name?: string
  last_name?: string
  role?: Role
  workspace?: Workspace
}
export interface AuthUser extends GotrueUser {}
export interface DbUser extends CrudItem {
  person?: Person
}

// ==============================
// Context
// ==============================
export interface DbUserWithAuthUser extends DbUser {
  authUser: AuthUser
}

export interface UserContextInterface<AppDbUser = any> {
  authRoutes?: {
    authenticationFailureRedirect?: string
    authenticationSuccessRedirect?: string
    authorizationFailureRedirect?: string
    authorizationSuccessRedirect?: string
  }

  authUser?: AuthUser
  authUserLoading: boolean

  dbUser?: DbUser & AppDbUser
  dbUserFetching: boolean
  dbUserLoading: boolean
  dbUserQueryResult: any
  logout: () => Promise<boolean>

  refetchDbUserQuery: () => any

  user?: DbUserWithAuthUser & AppDbUser // DbUser + Authuser mix
}
