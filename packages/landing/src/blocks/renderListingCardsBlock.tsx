import { CrudItem } from '@gravis-os/types'
import { BlockProps } from '../web/Block/Block'
import renderListingCardsBlockItem from './renderListingCardsBlockItem'
import { BlockItemProps } from '../web/Block/BlockItem'

export interface RenderListingCardsBlockProps
  extends Omit<BlockProps, 'items'> {
  items: (CrudItem & { [key: string]: string })[]
  overline?: string
  title?: string
  titleProps?: BlockItemProps['titleProps']
  subtitle?: string
}

const renderListingCardsBlock = (props: RenderListingCardsBlockProps) => {
  const { overline, title, titleProps, subtitle = '', items, ...rest } = props

  return {
    key: 'listing-cards',
    items: [
      overline && { type: 'overline', title: overline },
      title && {
        type: 'h3',
        title,
        titleProps: { gutterBottom: true, ...titleProps },
      },
      subtitle && {
        type: 'body1',
        title: subtitle,
        titleProps: {
          color: 'text.secondary',
          maxWidth: '50%',
        },
      },
      items.length && {
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
                backgroundColor: 'background.muted',
                borderRadius: 1,
              },
            },
            items: renderListingCardsBlockItem({ item }),
          }
        }),
      },
    ],
    ...rest,
  }
}

export default renderListingCardsBlock
