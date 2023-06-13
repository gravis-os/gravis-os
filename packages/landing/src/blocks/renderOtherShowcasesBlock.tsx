import { Showcase } from '../providers/LayoutProvider'
import { BlockProps } from '../web/Block/Block'
import renderShowcaseCardBlockItem from './renderShowcaseCardBlockItem'

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
      ...items.map((item) => renderShowcaseCardBlockItem({ item })),
    ],
    ...rest,
  }
}

export default renderOtherShowcasesBlock
