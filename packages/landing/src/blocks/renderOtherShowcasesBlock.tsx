import { Showcase } from '@gravis-os/types'

import { BlockProps } from '../web/Block/Block'
import renderShowcaseSlider from './renderShowcaseSlider'

export interface RenderOtherShowcasesBlockProps
  extends Omit<BlockProps, 'items'> {
  items?: Showcase[]
}

const renderOtherShowcasesBlock = (props: RenderOtherShowcasesBlockProps) => {
  const { items, ...rest } = props
  if (!items?.length) return
  return {
    id: 'other-showcases',
    items: [
      { title: 'Other Showcases', type: 'h4' },
      renderShowcaseSlider({ items }),
    ],
    sx: { backgroundColor: 'background.paper' },
    ...rest,
  }
}

export default renderOtherShowcasesBlock
