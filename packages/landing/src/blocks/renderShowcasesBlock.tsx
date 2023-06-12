import { BlockProps, Showcase } from '@gravis-os/landing'
import renderShowcaseCardBlockItem from './renderShowcaseCardBlockItem'

export interface RenderShowcasesBlockProps
  extends Omit<BlockProps, 'items' | 'title'> {
  items: Showcase[]
  title?: React.ReactNode
  subtitle?: React.ReactNode
  overline?: React.ReactNode
}

const renderShowcasesBlock = (props: RenderShowcasesBlockProps) => {
  const { overline, title, subtitle, items, ...rest } = props
  return {
    key: 'showcases',
    maxWidth: 'xl',
    items: [
      overline && {
        type: 'overline',
        title: overline,
      },
      title && {
        type: 'h3',
        title,
        titleProps: { gutterBottom: true, maxWidth: '60%' },
      },
      subtitle && {
        type: 'body1',
        title: subtitle,
        titleProps: {
          color: 'text.secondary',
          maxWidth: '45%',
        },
      },
      ...items.map((item) => renderShowcaseCardBlockItem({ item })),
    ],
    ...rest,
  }
}

export default renderShowcasesBlock
