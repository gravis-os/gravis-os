import { Post } from '@gravis-os/types'
import { BlockItemProps } from '../web/Block/BlockItem'
import renderPostsBlockItem from './renderPostsBlockItem'
import { BlockProps } from '../web/Block/Block'

export interface RenderFeaturedPostsBlockProps
  extends Omit<BlockProps, 'items'> {
  items?: Post[]
  title?: string
  fromStorage?: boolean
  gridProps?: BlockItemProps['gridProps']
  gridItemProps?: BlockItemProps['gridItemProps']
}

const renderFeaturedPostsBlock = (props: RenderFeaturedPostsBlockProps) => {
  const {
    title = 'Featured Insights',
    items,
    fromStorage,
    gridProps,
    gridItemProps,
    ...rest
  } = props
  if (!items?.length) return
  return {
    id: 'featured-posts',
    items: [
      { type: 'overline', title: 'Insights' },
      {
        type: 'h4',
        title,
        titleProps: { sx: { mb: { xs: 3, md: 5 } } },
      },
      renderPostsBlockItem({ items, fromStorage, gridItemProps, gridProps }),
    ],
    ...rest,
  }
}

export default renderFeaturedPostsBlock
