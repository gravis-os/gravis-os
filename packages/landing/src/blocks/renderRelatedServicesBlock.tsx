import { Service } from '@gravis-os/types'

import { BlockProps } from '../web/Block/Block'
import renderServicesBlockItem from './renderServicesBlockItem'

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
        title: 'Related Services',
        titleProps: { sx: { mb: { xs: 3, md: 5 } } },
        type: 'h4',
      },
      renderServicesBlockItem({ items }),
    ],
    ...rest,
  }
}

export default renderRelatedServicesBlock
