import { ClientTestimonial } from '@gravis-os/types'

import { BlockProps } from '../web/Block/Block'
import renderClientTestimonialCardBlockItem from './renderClientTestimonialCardBlockItem'

export interface RenderClientTestimonialCardsBlockProps
  extends Omit<BlockProps, 'items' | 'title'> {
  items: ClientTestimonial[]
  subtitle?: React.ReactNode
  title?: React.ReactNode
}

const renderClientTestimonialCardsBlock = (
  props: RenderClientTestimonialCardsBlockProps
) => {
  const {
    title = 'Trusted by Frontend Development Teams',
    items,
    subtitle = '',
    ...rest
  } = props

  return {
    id: 'client-testimonials',
    items: [
      { title: 'Client Testimonials', type: 'overline' },
      {
        title,
        titleProps: { gutterBottom: true },
        type: 'h3',
      },
      {
        title: subtitle,
        titleProps: {
          color: 'text.secondary',
          maxWidth: '50%',
        },
        type: 'body1',
      },
      {
        gridItems: items.map((item) => {
          return {
            xs: 12,
            sm: 6,
            md: 4,
            boxProps: {
              sx: {
                backgroundColor: 'background.paper',
                borderRadius: 1,
                px: 3,
                py: 4,
              },
            },
            items: renderClientTestimonialCardBlockItem({ item }),
          }
        }),
        gridProps: { spacing: 3 },
        sx: { mt: { xs: 3, md: 6 } },
        type: 'grid',
      },
    ],
    ...rest,
  }
}

export default renderClientTestimonialCardsBlock
