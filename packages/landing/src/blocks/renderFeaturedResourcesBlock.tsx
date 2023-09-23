import { Resource } from '@gravis-os/types'

import { useLayout } from '../providers/LayoutProvider'
import { BlockProps } from '../web/Block/Block'
import renderPostsBlockItem from './renderPostsBlockItem'

export interface RenderFeaturedResourcesBlockProps
  extends Omit<BlockProps, 'items'> {
  items?: Resource[]
  title?: string
}

const renderFeaturedResourcesBlock = (
  props: RenderFeaturedResourcesBlockProps
) => {
  const { title = 'Featured Resources', items, ...rest } = props
  const { routeConfig } = useLayout()
  if (!items?.length) return
  return {
    id: 'featured-resources',
    items: [
      { title: 'Resources', type: 'overline' },
      {
        title,
        titleProps: { sx: { mb: { xs: 3, md: 5 } } },
        type: 'h4',
      },
      renderPostsBlockItem({
        items: items.map((resource) => {
          return {
            ...resource,
            href: `${routeConfig.RESOURCES}/${resource.slug}`,
          }
        }),
      }),
    ],
    ...rest,
  }
}

export default renderFeaturedResourcesBlock
