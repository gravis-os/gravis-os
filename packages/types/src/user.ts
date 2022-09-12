// ==============================
// User-Related Models
// ==============================
export interface Permission {
  title: string
}
export interface Role {
  title: string
  permission: Permission[]
}
export interface Feature {
  title: string
}
export interface Tier {
  title: string
  feature_ids: Array<{ title: string }>
  feature: Feature[]
}
export interface Workspace {
  title: string
  slug: string
  tier: Tier
}
export interface Company {}
export interface Person {
  company?: Company
  role?: Role
  workspace?: Workspace
}
export interface AuthUser {}
export interface DbUser {
  id: string
  title: string
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
