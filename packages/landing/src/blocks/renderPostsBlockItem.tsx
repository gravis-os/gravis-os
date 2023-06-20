import { Post } from '@gravis-os/types'
import orderBy from 'lodash/orderBy'
import { useLayout } from '../providers/LayoutProvider'
import renderPostBlockItem, {
  RenderPostBlockItemProps,
} from './renderPostBlockItem'

export interface RenderPostsBlockItemProps {
  items: Post[]
  fromStorage?: boolean
}

const renderPostsBlockItem = (props: RenderPostsBlockItemProps) => {
  const { items, fromStorage } = props
  const { routeConfig } = useLayout()
  return {
    type: 'grid',
    gridItems: orderBy(items, 'published_at', 'desc').map((item) => {
      return renderPostBlockItem({
        item: {
          href: `${routeConfig?.POSTS}/${item?.category?.slug}/${item?.slug}`,
          ...(item as RenderPostBlockItemProps['item']),
        },
        fromStorage,
      })
    }),
  }
}

export default renderPostsBlockItem
