import { Technology } from '@gravis-os/types'

import { useLayout } from '../providers/LayoutProvider'
import { BlockProps } from '../web/Block/Block'
import renderTechnologyBlockItem from './renderTechnologyBlockItem'

export interface RenderTechnologysBlockProps extends Omit<BlockProps, 'items'> {
  items: Technology[]
}

const renderTechnologysBlock = (props: RenderTechnologysBlockProps) => {
  const { items, ...rest } = props
  const { routeConfig } = useLayout()

  return {
    id: 'technologys',
    items: [
      {
        title: 'Our Technologies',
        titleProps: { textAlign: 'center' },
        type: 'overline',
      },
      {
        title: 'Work with Future-proof Technologies',
        titleProps: { gutterBottom: true, textAlign: 'center' },
        type: 'h3',
      },
      {
        title:
          'We stay at the forefront of the latest technology by investing heavily and constantly evaluating the newest emerging technologies and frameworks that enable us to build robust solutions that scale and last.',
        boxProps: { textAlign: 'center' },
        maxWidth: 'md',
        titleProps: {
          color: 'text.secondary',
          maxWidth: true,
          textAlign: 'center',
        },
        type: 'body1',
      },
      {
        gridItems: items.map((item) =>
          renderTechnologyBlockItem({
            item: {
              ...item,
              href: `${routeConfig?.TECHNOLOGYS}/${item.slug}`,
            },
          })
        ),
        gridProps: { rowSpacing: 8, spacing: 4 },
        maxWidth: 'xl',
        sx: { mt: { xs: 5, md: 10 } },
        type: 'grid',
      },
    ] as BlockProps['items'],
    mode: 'light',
    sx: { backgroundColor: 'background.paper' },
    ...rest,
  }
}

export default renderTechnologysBlock
