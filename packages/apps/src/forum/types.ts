import { CrudItem, Person } from '@gravis-os/types'

export interface ForumCategory extends CrudItem {
  forum?: {
    id: number
    slug: string
    title: string
  }
}

export interface Thread extends CrudItem {
  avatar_alt?: string
  avatar_src?: string
  content?: string
  forum_category?: ForumCategory
  hero_alt?: string
  hero_src?: string
  id: number
  person?: Person
  subtitle?: string
  title: string
  upvote_count: number
}

export interface ThreadComment extends CrudItem {
  avatar_alt?: string
  avatar_src?: string
  content?: string
  id: number
  person?: Person
  upvote_count: number
}
