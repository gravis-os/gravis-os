import { CrudItem } from '@gravis-os/types'

export interface Thread extends CrudItem {
  avatar_alt?: string
  avatar_src?: string
  forum_category?: {
    forum?: {
      id: number
      slug: string
      title: string
    }
    id: number
    slug: string
    title: string
  }
  hero_alt?: string
  hero_src?: string
  id: number
  subtitle?: string
  title: string
}
