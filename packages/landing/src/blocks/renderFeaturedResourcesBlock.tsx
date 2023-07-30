import { Resource } from '@gravis-os/types'
import renderPostsBlockItem from './renderPostsBlockItem'
import { BlockProps } from '../web/Block/Block'
import { useLayout } from '../providers/LayoutProvider'

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
      { type: 'overline', title: 'Resources' },
      {
        type: 'h4',
        title,
        titleProps: { sx: { mb: { xs: 3, md: 5 } } },
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
