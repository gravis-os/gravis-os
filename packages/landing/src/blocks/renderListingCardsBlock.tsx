import { CrudModule } from '@gravis-os/types'
import { Listing } from '@gravis-os/apps/directory'
import { BlockProps } from '../web/Block/Block'
import { BlockItemProps } from '../web/Block/BlockItem'
import renderListingCardsBlockItem from './renderListingCardsBlockItem'

export interface RenderListingCardsBlockProps
  extends Omit<BlockProps, 'items'> {
  items: Listing[]
  brandModule: CrudModule | any
  listingModule: CrudModule | any
  overline?: string
  title?: string
  titleProps?: BlockItemProps['titleProps']
  subtitle?: string
}

const renderListingCardsBlock = (props: RenderListingCardsBlockProps) => {
  const {
    overline,
    title,
    titleProps,
    subtitle = '',
    items,
    brandModule,
    listingModule,
    ...rest
  } = props

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
            items: renderListingCardsBlockItem({
              item,
              brandModule,
              listingModule,
            }),
          }
        }),
      },
    ],
    ...rest,
  }
}

export default renderListingCardsBlock
