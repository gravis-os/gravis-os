import { CrudItem } from '@gravis-os/types'

export interface Contact extends CrudItem {
  avatar_alt?: string
  avatar_src?: string
  company: CrudItem
  email?: string
  full_name?: string
  lead_status: string
  mobile?: string
  role: CrudItem
  title: string
}

export interface Memo extends CrudItem {}
