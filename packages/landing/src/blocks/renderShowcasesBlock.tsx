import { Showcase } from '@gravis-os/types'

import { BlockProps } from '../web/Block/Block'
import renderShowcaseCardBlockItem from './renderShowcaseCardBlockItem'

export interface RenderShowcasesBlockProps
  extends Omit<BlockProps, 'items' | 'title'> {
  items: Showcase[]
  overline?: React.ReactNode
  subtitle?: React.ReactNode
  title?: React.ReactNode
}

const renderShowcasesBlock = (props: RenderShowcasesBlockProps) => {
  const { title, items, overline, subtitle, ...rest } = props
  return {
    id: 'showcases',
    items: [
      overline && {
        title: overline,
        type: 'overline',
      },
      title && {
        title,
        titleProps: { gutterBottom: true, maxWidth: '60%' },
        type: 'h3',
      },
      subtitle && {
        title: subtitle,
        titleProps: {
          color: 'text.secondary',
          maxWidth: '45%',
        },
        type: 'body1',
      },
      ...items.map((item) => renderShowcaseCardBlockItem({ item })),
    ],
    maxWidth: 'xl',
    ...rest,
  }
}

export default renderShowcasesBlock
