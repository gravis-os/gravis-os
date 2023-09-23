import { BlockProps } from '../web/Block/Block'

export interface RenderFaqsAccordionBlockProps
  extends Omit<BlockProps, 'items'> {
  items?: Array<{ content?: string; id?: string; title: string }>
}

const renderFaqsAccordionBlock = (props: RenderFaqsAccordionBlockProps) => {
  const { items, ...rest } = props

  return {
    id: 'faqs',
    ...rest,
    items: [
      {
        gridItemProps: {
          sx: { textAlign: { xs: 'center', md: 'left' } },
        },
        gridItems: [
          {
            md: 4,
            items: [
              {
                title: 'FAQs',
                maxWidth: 'md',
                titleProps: { gutterBottom: true },
                type: 'h3',
              },
              {
                title:
                  'Learn how we deliver effective, value-driven technological innovations for leading enterprises.',
                maxWidth: 'md',
                titleProps: {
                  color: 'text.secondary',
                  maxWidth: '70%',
                },
                type: 'body1',
              },
            ],
          },
          {
            md: 8,
            items: [
              {
                title: items.map((item) => {
                  const { id, title, content } = item
                  return {
                    id: id || title,
                    title,
                    content,
                  }
                }),
                titleProps: {
                  sx: { textAlign: 'left' },
                  titleProps: { variant: 'subtitle2' as const },
                },
                type: 'accordion',
              },
            ],
          },
        ],
        gridProps: { spacing: 4 },
        type: 'grid',
      },
    ],
  }
}

export default renderFaqsAccordionBlock
