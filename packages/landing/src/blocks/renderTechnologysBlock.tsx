import { useLayout } from 'src/providers'
import { Technology } from '@gravis-os/types'
import { BlockProps } from 'src/web'
import renderTechnologyBlockItem from './renderTechnologyBlockItem'

export interface RenderTechnologysBlockProps extends Omit<BlockProps, 'items'> {
  items: Technology[]
}

const renderTechnologysBlock = (props: RenderTechnologysBlockProps) => {
  const { items, ...rest } = props
  const { routeConfig } = useLayout()

  return {
    key: 'technologys',
    sx: { backgroundColor: 'background.paper' },
    mode: 'light',
    items: [
      {
        type: 'overline',
        title: 'Our Technologies',
        titleProps: { textAlign: 'center' },
      },
      {
        type: 'h3',
        title: 'Work with Future-proof Technologies',
        titleProps: { gutterBottom: true, textAlign: 'center' },
      },
      {
        type: 'body1',
        maxWidth: 'md',
        title:
          'We stay at the forefront of the latest technology by investing heavily and constantly evaluating the newest emerging technologies and frameworks that enable us to build robust solutions that scale and last.',
        boxProps: { textAlign: 'center' },
        titleProps: {
          color: 'text.secondary',
          textAlign: 'center',
          maxWidth: true,
        },
      },
      {
        maxWidth: 'xl',
        type: 'grid',
        sx: { mt: { xs: 5, md: 10 } },
        gridProps: { spacing: 4, rowSpacing: 8 },
        gridItems: items.map((item) =>
          renderTechnologyBlockItem({
            item: {
              ...item,
              href: `${routeConfig.TECHNOLOGYS}/${item.slug}`,
            },
          })
        ),
      },
    ] as BlockProps['items'],
    ...rest,
  }
}

export default renderTechnologysBlock
