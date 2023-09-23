import { Post } from '@gravis-os/types'

import type { BlockItemProps } from '../web/Block/BlockItem'

import { BlockProps } from '../web/Block/Block'
import renderPostsBlockItem from './renderPostsBlockItem'

export interface RenderFeaturedPostsBlockProps
  extends Omit<BlockProps, 'items'> {
  fromStorage?: boolean
  gridItemProps?: BlockItemProps['gridItemProps']
  gridProps?: BlockItemProps['gridProps']
  items?: Post[]
  title?: string
}

const renderFeaturedPostsBlock = (props: RenderFeaturedPostsBlockProps) => {
  const {
    title = 'Featured Insights',
    fromStorage,
    gridItemProps,
    gridProps,
    items,
    ...rest
  } = props
  if (!items?.length) return
  return {
    id: 'featured-posts',
    items: [
      { title: 'Insights', type: 'overline' },
      {
        title,
        titleProps: { sx: { mb: { xs: 3, md: 5 } } },
        type: 'h4',
      },
      renderPostsBlockItem({ fromStorage, gridItemProps, gridProps, items }),
    ],
    ...rest,
  }
}

export default renderFeaturedPostsBlock
