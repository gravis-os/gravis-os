import { Post } from '@gravis-os/types'
import renderPostsBlockItem from './renderPostsBlockItem'
import { BlockProps } from '../web/Block/Block'

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
        type: 'h4',
        title: 'Related Insights',
        titleProps: { sx: { mb: { xs: 3, md: 5 } } },
      },
      renderPostsBlockItem({ items }),
    ],
    ...rest,
  }
}

export default renderRelatedPostsBlock
