import { Post } from '@gravis-os/types'

import { BlockProps } from '../web/Block/Block'
import renderPostsBlockItem from './renderPostsBlockItem'

export interface RenderOtherPostsBlockProps extends Omit<BlockProps, 'items'> {
  items?: Post[]
}

const renderOtherPostsBlock = (props: RenderOtherPostsBlockProps) => {
  const { items, ...rest } = props
  if (!items?.length) return {}
  return {
    id: 'other-posts',
    items: [
      {
        title: 'Other Insights',
        titleProps: { sx: { mb: { xs: 3, md: 5 } } },
        type: 'h4',
      },
      renderPostsBlockItem({ items }),
    ],
    ...rest,
  }
}

export default renderOtherPostsBlock
