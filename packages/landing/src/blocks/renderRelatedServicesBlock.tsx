import { Service } from '@gravis-os/types'
import renderServicesBlockItem from './renderServicesBlockItem'
import { BlockProps } from '../web/Block/Block'

export interface RenderRelatedServicesBlockProps
  extends Omit<BlockProps, 'items'> {
  items?: Service[]
}

const renderRelatedServicesBlock = (props: RenderRelatedServicesBlockProps) => {
  const { items, ...rest } = props
  if (!items?.length) return
  return {
    id: 'related-services',
    items: [
      {
        type: 'h4',
        title: 'Related Services',
        titleProps: { sx: { mb: { xs: 3, md: 5 } } },
      },
      renderServicesBlockItem({ items }),
    ],
    ...rest,
  }
}

export default renderRelatedServicesBlock
