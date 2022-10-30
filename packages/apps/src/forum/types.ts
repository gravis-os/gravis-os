import { CrudItem } from '@gravis-os/types'

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
  person?: {
    title: string
    slug: string
    first_name?: string
    last_name?: string
    avatar_src?: string
    avatar_alt?: string
  }
  forum_category?: {
    id: number
    title: string
    slug: string
    forum?: {
      id: number
      title: string
      slug: string
    }
  }
}
