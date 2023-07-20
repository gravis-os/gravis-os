import { PressRelease } from '@gravis-os/types'
import { renderPostsBlockItem } from './index'
import { BlockProps } from '../web/Block/Block'
import { useLayout } from '../providers/LayoutProvider'

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
    key: 'featured-news',
    items: [
      { type: 'overline', title: 'News' },
      {
        type: 'h4',
        title,
        titleProps: { sx: { mb: { xs: 3, md: 5 } } },
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
