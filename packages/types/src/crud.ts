import type { SupabaseClient } from '@supabase/auth-helpers-nextjs'
// ==============================
// Crud
// ==============================
export type CrudModuleAfterTriggerFunction = ({
  item,
  values,
  client,
}: {
  client: SupabaseClient
  item: Record<string, unknown>
  user: Record<string, unknown>
  values: Record<string, unknown>
}) => Promise<unknown>

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
  // Virtuals
  virtuals?: Record<string, (item: Record<string, unknown>) => unknown>
  // Application Triggers
  triggers?: {
    afterInsert?: CrudModuleAfterTriggerFunction
    afterUpdate?: CrudModuleAfterTriggerFunction
  }
}

export interface CrudItem {
  id: number | string
  created_at?: Date
  updated_at?: Date
  title: string
  slug?: string
  subtitle?: string | null
  avatar_src?: string | null
  workspace_id?: number
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

// ==============================
// Plugins
// ==============================
export interface CrudModuleWithGetWebHref extends CrudModule {
  getWebHref: (items: CrudItem[] | CrudItem) => string
}
