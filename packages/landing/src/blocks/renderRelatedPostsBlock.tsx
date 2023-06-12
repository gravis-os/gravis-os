import { Post } from '@gravis-os/types'
import { renderPostsBlockItem } from './index'
import { BlockProps } from '../web'

export interface RenderRelatedPostsBlockProps
  extends Omit<BlockProps, 'items'> {
  items?: Post[]
}

const renderRelatedPostsBlock = (props: RenderRelatedPostsBlockProps) => {
  const { items, ...rest } = props
  if (!items?.length) return
  return {
    key: 'related-posts',
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
