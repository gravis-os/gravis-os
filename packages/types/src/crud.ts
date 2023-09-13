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
  table: { name: string; isJoinTable?: boolean }
  select?: { detail?: string; list?: string; count?: string; filter?: string }
  Icon?: React.ElementType
  relations?: {
    [key: string]: {
      table: { name: string; columns?: string[] }
      joinTable?: { name: string }
    }
  }
  // For modules with `exclusive_locales` and `blocked_locales` columns
  hasLocales?: boolean
  // Virtuals
  virtuals?: Record<string, (item: any) => any>
  // Application Triggers
  triggers?: {
    afterInsert?: CrudModuleAfterTriggerFunction
    afterUpdate?: CrudModuleAfterTriggerFunction
  }
  disableAutoSlug?: boolean // To disable autoSlug
  /** Mapping of database headers into other names which will be reflected when user downloads CSV file. */
  tableHeaderRenameMapping?: Record<string, string>
}

export interface CrudItem {
  id: number | string
  created_at?: string | Date
  updated_at?: string | Date
  title: string
  slug?: string
  subtitle?: string | null
  avatar_src?: string | null
  avatar_alt?: string
  workspace_id?: number
  exclusive_locales?: string[]
  blocked_locales?: string[]
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
