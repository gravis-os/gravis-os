export type AppProps = {
  text?: string
  description?: string
}

export type RenderPropsFunction<RenderProps> = (
  renderProps: RenderProps
) => React.ReactElement | null

// ==============================
// Crud
// ==============================
export interface CrudModule {
  pk?: string // primary key - used for display e.g. title
  sk: string // slug key - used for route e.g. slug
  name: { singular: string; plural: string }
  route?: { plural: string }
  table: { name: string }
  select?: { detail?: string; list?: string }
  Icon?: React.ElementType
}

export type CrudItem =
  | {
      id: number
      title: string
      subtitle?: string
      avatar_src?: string
    }
  | undefined
  | null

// ==============================
// Nav
// ==============================
export interface NavConfigItem {
  key: string
}

// ==============================
// Models
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
