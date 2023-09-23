import { Post } from '@gravis-os/types'
import orderBy from 'lodash/orderBy'

import type { BlockItemProps } from '../web/Block/BlockItem'

import { useLayout } from '../providers/LayoutProvider'
import renderPostBlockItem, {
  RenderPostBlockItemProps,
} from './renderPostBlockItem'

export interface RenderPostsBlockItemProps {
  fromStorage?: boolean
  gridItemProps?: BlockItemProps['gridItemProps']
  gridProps?: BlockItemProps['gridProps']
  items: Post[]
}

const renderPostsBlockItem = (props: RenderPostsBlockItemProps) => {
  const { fromStorage, gridItemProps, gridProps, items } = props
  const { routeConfig } = useLayout()
  return {
    gridItems: orderBy(items, 'published_at', 'desc').map((item) => {
      return renderPostBlockItem({
        fromStorage,
        item: {
          href: `${routeConfig?.POSTS}/${item?.category?.slug}/${item?.slug}`,
          ...(item as RenderPostBlockItemProps['item']),
        },
        itemProps: gridItemProps,
      })
    }),
    gridProps,
    type: 'grid',
  }
}

export default renderPostsBlockItem
