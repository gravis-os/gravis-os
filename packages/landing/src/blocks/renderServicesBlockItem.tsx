import { Service } from '@gravis-os/types'

import { useLayout } from '../providers/LayoutProvider'
import { BlockItemProps } from '../web/Block/BlockItem'
import renderServiceBlockItem, {
  RenderServiceBlockItemProps,
} from './renderServiceBlockItem'

export interface RenderServicesBlockItemProps
  extends Omit<BlockItemProps, 'items'> {
  items: Service[]
}

const renderServicesBlockItem = (props: RenderServicesBlockItemProps) => {
  const { items, ...rest } = props
  const { routeConfig } = useLayout()
  return {
    gridItems: items.map((item) => {
      return renderServiceBlockItem({
        item: {
          href: `${routeConfig?.SERVICES}/${item.category.slug}/${item.slug}`,
          ...(item as RenderServiceBlockItemProps['item']),
        },
      })
    }),
    type: 'grid',
    ...rest,
  }
}

export default renderServicesBlockItem
