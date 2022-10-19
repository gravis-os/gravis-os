import { CrudItem } from '@gravis-os/types'

export interface Post extends CrudItem {
  id: number
  avatar_src?: string
  avatar_alt?: string
  title: string
  subtitle?: string
  blog_category?: {
    id: number
    title: string
    slug: string
    blog?: {
      id: number
      title: string
      slug: string
    }
  }
}