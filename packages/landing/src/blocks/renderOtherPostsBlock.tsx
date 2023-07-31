import { Post } from '@gravis-os/types'
import renderPostsBlockItem from './renderPostsBlockItem'
import { BlockProps } from '../web/Block/Block'

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
        type: 'h4',
        title: 'Other Insights',
        titleProps: { sx: { mb: { xs: 3, md: 5 } } },
      },
      renderPostsBlockItem({ items }),
    ],
    ...rest,
  }
}

export default renderOtherPostsBlock
