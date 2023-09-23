import { PressRelease } from '@gravis-os/types'

import { useLayout } from '../providers/LayoutProvider'
import { BlockProps } from '../web/Block/Block'
import renderPostsBlockItem from './renderPostsBlockItem'

export interface RenderFeaturedNewsBlockProps
  extends Omit<BlockProps, 'items'> {
  items?: PressRelease[]
  title?: string
}

const renderFeaturedNewsBlock = (props: RenderFeaturedNewsBlockProps) => {
  const { title = 'Featured News', items, ...rest } = props
  const { routeConfig } = useLayout()
  if (!items?.length) return
  return {
    id: 'featured-news',
    items: [
      { title: 'News', type: 'overline' },
      {
        title,
        titleProps: { sx: { mb: { xs: 3, md: 5 } } },
        type: 'h4',
      },
      renderPostsBlockItem({
        items: items.map((item) => {
          return {
            ...item,
            href: `${routeConfig.PRESS_RELEASES}/${item.slug}`,
          }
        }),
      }),
    ],
    ...rest,
  }
}

export default renderFeaturedNewsBlock
