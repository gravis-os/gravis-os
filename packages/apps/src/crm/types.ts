import { CrudItem } from '@gravis-os/types'

export interface Contact extends CrudItem {
  title: string
  role: CrudItem
  company: CrudItem
  full_name?: string
  email?: string
  mobile?: string
  avatar_src?: string
  avatar_alt?: string
}

export interface Memo extends CrudItem {}
