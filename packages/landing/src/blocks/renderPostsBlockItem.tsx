import { Post } from '@gravis-os/types'
import orderBy from 'lodash/orderBy'
import { useLayout } from '@gravis-os/landing'
import renderPostBlockItem, {
  RenderPostBlockItemProps,
} from './renderPostBlockItem'

export interface RenderPostsBlockItemProps {
  items: Post[]
}

const renderPostsBlockItem = (props: RenderPostsBlockItemProps) => {
  const { items } = props
  const { routeConfig } = useLayout()
  return {
    type: 'grid',
    gridItems: orderBy(items, 'published_at', 'desc').map((item) => {
      return renderPostBlockItem({
        item: {
          href: `${routeConfig?.POSTS}/${item.category.slug}/${item.slug}`,
          ...(item as RenderPostBlockItemProps['item']),
        },
      })
    }),
  }
}

export default renderPostsBlockItem
