// ==============================
// User-Related Models
// ==============================
import { User as GotrueUser } from '@supabase/gotrue-js/dist/module/lib/types'
import { CrudItem } from './crud'

export interface Permission extends CrudItem {}
export interface Role extends CrudItem {
  permission: Permission[]
  valid_subdirectory_pathnames?: string[]
  authentication_success_redirect_route?: string
}
export interface Feature extends CrudItem {}
export interface Tier extends CrudItem {
  feature_ids: Array<{ title: string }>
  feature: Feature[]
}
export interface Workspace extends CrudItem {
  slug: string
  tier: Tier
}
export interface Company extends CrudItem {}
export interface Person extends CrudItem {
  first_name?: string
  last_name?: string
  avatar_src?: string
  avatar_alt?: string
  company?: Company
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
  user?: DbUserWithAuthUser & AppDbUser // DbUser + Authuser mix

  authUserLoading: boolean
  authUser?: AuthUser

  dbUser?: DbUser & AppDbUser
  dbUserLoading: boolean
  dbUserFetching: boolean
  dbUserQueryResult: any
  refetchDbUserQuery: () => any

  logout: () => Promise<boolean>

  authRoutes?: {
    authenticationSuccessRedirect?: string
    authenticationFailureRedirect?: string
    authorizationSuccessRedirect?: string
    authorizationFailureRedirect?: string
  }
}
