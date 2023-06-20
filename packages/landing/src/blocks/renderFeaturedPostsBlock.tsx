import { Post } from '@gravis-os/types'
import { renderPostsBlockItem } from './index'
import { BlockProps } from '../web/Block/Block'

export interface RenderFeaturedPostsBlockProps
  extends Omit<BlockProps, 'items'> {
  items?: Post[]
  title?: string
  fromStorage?: boolean
}

const renderFeaturedPostsBlock = (props: RenderFeaturedPostsBlockProps) => {
  const { title = 'Featured Insights', items, fromStorage, ...rest } = props
  if (!items?.length) return
  return {
    key: 'featured-posts',
    items: [
      { type: 'overline', title: 'Insights' },
      {
        type: 'h4',
        title,
        titleProps: { sx: { mb: { xs: 3, md: 5 } } },
      },
      renderPostsBlockItem({ items, fromStorage }),
    ],
    ...rest,
  }
}

export default renderFeaturedPostsBlock
