import { CrudItem, Person } from '@gravis-os/types'

export interface ForumCategory extends CrudItem {
  forum?: {
    id: number
    title: string
    slug: string
  }
}

export interface Thread extends CrudItem {
  id: number
  hero_src?: string
  hero_alt?: string
  avatar_src?: string
  avatar_alt?: string
  title: string
  subtitle?: string
  content?: string
  upvote_count: number
  person?: Person
  forum_category?: ForumCategory
}

export interface ThreadComment extends CrudItem {
  id: number
  avatar_src?: string
  avatar_alt?: string
  content?: string
  upvote_count: number
  person?: Person
}
