import { Post } from '@gravis-os/types'

import { BlockProps } from '../web/Block/Block'
import renderPostsBlockItem from './renderPostsBlockItem'

export interface RenderRelatedPostsBlockProps
  extends Omit<BlockProps, 'items'> {
  items?: Post[]
}

const renderRelatedPostsBlock = (props: RenderRelatedPostsBlockProps) => {
  const { items, ...rest } = props
  if (!items?.length) return
  return {
    id: 'related-posts',
    items: [
      {
        title: 'Related Insights',
        titleProps: { sx: { mb: { xs: 3, md: 5 } } },
        type: 'h4',
      },
      renderPostsBlockItem({ items }),
    ],
    ...rest,
  }
}

export default renderRelatedPostsBlock
