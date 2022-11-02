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
  relations?: {
    [key: string]: { table: { name: string }; joinTable?: { name: string } }
  }
  // For modules with `exclusive_locales` and `blocked_locales` columns
  hasLocales?: boolean
}

export interface CrudItem {
  id: number | string
  created_at?: Date
  updated_at?: Date
  title: string
  slug?: string
  subtitle?: string | null
  avatar_src?: string | null
}

// ==============================
// Context
// ==============================
export interface CrudContextInterface<AppCrudModule = any, AppCrudItem = any> {
  selectedItems: AppCrudItem[]
  setSelectedItems: React.Dispatch<React.SetStateAction<AppCrudItem[]>>
  hasSelectedItems: boolean
  hasMultipleSelectedItems: boolean

  deleteDialogOpen: boolean
  handleDeleteDialogOpen: () => void
  handleDeleteDialogClose: () => void
}
