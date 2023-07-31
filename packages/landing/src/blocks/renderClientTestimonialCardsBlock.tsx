import { ClientTestimonial } from '@gravis-os/types'
import renderClientTestimonialCardBlockItem from './renderClientTestimonialCardBlockItem'
import { BlockProps } from '../web/Block/Block'

export interface RenderClientTestimonialCardsBlockProps
  extends Omit<BlockProps, 'items' | 'title'> {
  items: ClientTestimonial[]
  title?: React.ReactNode
  subtitle?: React.ReactNode
}

const renderClientTestimonialCardsBlock = (
  props: RenderClientTestimonialCardsBlockProps
) => {
  const {
    title = 'Trusted by Frontend Development Teams',
    subtitle = '',
    items,
    ...rest
  } = props

  return {
    id: 'client-testimonials',
    items: [
      { type: 'overline', title: 'Client Testimonials' },
      {
        type: 'h3',
        title,
        titleProps: { gutterBottom: true },
      },
      {
        type: 'body1',
        title: subtitle,
        titleProps: {
          color: 'text.secondary',
          maxWidth: '50%',
        },
      },
      {
        type: 'grid',
        sx: { mt: { xs: 3, md: 6 } },
        gridProps: { spacing: 3 },
        gridItems: items.map((item) => {
          return {
            xs: 12,
            sm: 6,
            md: 4,
            boxProps: {
              sx: {
                py: 4,
                px: 3,
                backgroundColor: 'background.paper',
                borderRadius: 1,
              },
            },
            items: renderClientTestimonialCardBlockItem({ item }),
          }
        }),
      },
    ],
    ...rest,
  }
}

export default renderClientTestimonialCardsBlock
