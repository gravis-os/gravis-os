import { Post } from '@gravis-os/types'
import orderBy from 'lodash/orderBy'
import type { BlockItemProps } from '../web/Block/BlockItem'
import { useLayout } from '../providers/LayoutProvider'
import renderPostBlockItem, {
  RenderPostBlockItemProps,
} from './renderPostBlockItem'

export interface RenderPostsBlockItemProps {
  items: Post[]
  fromStorage?: boolean
  gridItemProps?: BlockItemProps['gridItemProps']
  gridProps?: BlockItemProps['gridProps']
}

const renderPostsBlockItem = (props: RenderPostsBlockItemProps) => {
  const { items, fromStorage, gridItemProps, gridProps } = props
  const { routeConfig } = useLayout()
  return {
    type: 'grid',
    gridProps,
    gridItems: orderBy(items, 'published_at', 'desc').map((item) => {
      return renderPostBlockItem({
        item: {
          href: `${routeConfig?.POSTS}/${item?.category?.slug}/${item?.slug}`,
          ...(item as RenderPostBlockItemProps['item']),
        },
        itemProps: gridItemProps,
        fromStorage,
      })
    }),
  }
}

export default renderPostsBlockItem
