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
