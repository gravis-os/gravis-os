import { BlockProps } from '../web/Block/Block'

export interface RenderFaqsAccordionBlockProps
  extends Omit<BlockProps, 'items'> {
  items?: Array<{ id?: string; title: string; content?: string }>
}

const renderFaqsAccordionBlock = (props: RenderFaqsAccordionBlockProps) => {
  const { items, ...rest } = props

  return {
    id: 'faqs',
    ...rest,
    items: [
      {
        type: 'grid',
        gridProps: { spacing: 4 },
        gridItemProps: {
          sx: { textAlign: { xs: 'center', md: 'left' } },
        },
        gridItems: [
          {
            md: 4,
            items: [
              {
                type: 'h3',
                title: 'FAQs',
                maxWidth: 'md',
                titleProps: { gutterBottom: true },
              },
              {
                type: 'body1',
                title:
                  'Learn how we deliver effective, value-driven technological innovations for leading enterprises.',
                maxWidth: 'md',
                titleProps: {
                  color: 'text.secondary',
                  maxWidth: '70%',
                },
              },
            ],
          },
          {
            md: 8,
            items: [
              {
                type: 'accordion',
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
              },
            ],
          },
        ],
      },
    ],
  }
}

export default renderFaqsAccordionBlock
