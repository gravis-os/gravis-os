import { Service } from '@gravis-os/types'
import { useLayout } from 'src/providers'
import { BlockItemProps } from 'src/web'
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
    type: 'grid',
    gridItems: items.map((item) => {
      return renderServiceBlockItem({
        item: {
          href: `${routeConfig.SERVICES}/${item.category.slug}/${item.slug}`,
          ...(item as RenderServiceBlockItemProps['item']),
        },
      })
    }),
    ...rest,
  }
}

export default renderServicesBlockItem
