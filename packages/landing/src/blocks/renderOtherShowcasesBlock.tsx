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
    key: 'other-showcases',
    sx: { backgroundColor: 'background.paper' },
    items: [
      { type: 'h4', title: 'Other Showcases' },
      renderShowcaseSlider({ items }),
    ],
    ...rest,
  }
}

export default renderOtherShowcasesBlock
