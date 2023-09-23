import type { SupabaseClient } from '@supabase/auth-helpers-nextjs'

import { DbUserWithAuthUser } from './user'
// ==============================
// Crud
// ==============================
export type CrudModuleAfterTriggerFunction = ({
  client,
  item,
  user,
  values,
}: {
  client: SupabaseClient
  item: Record<string, unknown>
  user: DbUserWithAuthUser
  values: Record<string, unknown>
}) => Promise<unknown>

export interface CrudModule {
  Icon?: React.ElementType
  disableAutoSlug?: boolean // To disable autoSlug
  // For modules with `exclusive_locales` and `blocked_locales` columns
  hasLocales?: boolean
  name: { plural: string; singular: string }
  pk?: string // primary key - used for display e.g. title
  relations?: {
    [key: string]: {
      joinTable?: { name: string }
      table: { columns?: string[]; name: string }
    }
  }
  route?: { plural: string }
  select?: { count?: string; detail?: string; filter?: string; list?: string }
  sk: string // slug key - used for route e.g. slug
  table: { isJoinTable?: boolean; name: string }
  /** Mapping of database headers into other names which will be reflected when user downloads CSV file. */
  tableHeaderRenameMapping?: Record<string, string>
  // Application Triggers
  triggers?: {
    afterInsert?: CrudModuleAfterTriggerFunction
    afterUpdate?: CrudModuleAfterTriggerFunction
  }
  // Virtuals
  virtuals?: Record<string, (item: any) => any>
}

export interface CrudItem {
  avatar_alt?: string
  avatar_src?: null | string
  blocked_locales?: string[]
  created_at?: Date | string
  exclusive_locales?: string[]
  id: number | string
  slug?: string
  subtitle?: null | string
  title: string
  updated_at?: Date | string
  workspace_id?: number
}

// ==============================
// Context
// ==============================
export interface CrudContextInterface<AppCrudModule = any, AppCrudItem = any> {
  deleteDialogOpen: boolean
  handleDeleteDialogClose: () => void
  handleDeleteDialogOpen: () => void
  hasMultipleSelectedItems: boolean

  hasSelectedItems: boolean
  selectedItems: AppCrudItem[]
  setSelectedItems: React.Dispatch<React.SetStateAction<AppCrudItem[]>>
}

// ==============================
// Plugins
// ==============================
export interface CrudModuleWithGetWebHref extends CrudModule {
  getWebHref: (items: CrudItem | CrudItem[]) => string
}
