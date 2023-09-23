import { CrudItem } from '@gravis-os/types'

export interface Post extends CrudItem {
  avatar_alt?: string
  avatar_src?: string
  blog_category?: {
    blog?: {
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
