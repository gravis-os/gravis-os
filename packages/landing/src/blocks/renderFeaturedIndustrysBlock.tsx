import { ClientTestimonial } from '@gravis-os/types'

import { useLayout } from '../providers/LayoutProvider'
import { BlockProps } from '../web/Block/Block'
import { BlockItemProps } from '../web/Block/BlockItem'
import renderFeaturedIndustryBlockItem from './renderFeaturedIndustryBlockItem'

export interface RenderFeaturedIndustrysBlockProps
  extends Omit<BlockProps, 'items' | 'title'> {
  items: ClientTestimonial[]
  subtitle?: React.ReactNode
  title?: React.ReactNode
  titleType?: BlockItemProps['type']
  disableHref?: boolean
}

const renderFeaturedIndustrysBlock = (
  props: RenderFeaturedIndustrysBlockProps
) => {
  const {
    title = 'Featured Industries',
    items,
    subtitle = '',
    titleType = 'h3',
    disableHref,
    ...rest
  } = props
  const { routeConfig } = useLayout()

  return {
    id: 'featured-industrys',
    items: [
      {
        title: 'Industries',
        titleProps: {
          textAlign: { xs: 'center', md: 'left' },
        },
        type: 'overline',
      },
      {
        title,
        titleProps: {
          gutterBottom: true,
          textAlign: { xs: 'center', md: 'left' },
        },
        type: titleType,
      },
      {
        title: subtitle,
        titleProps: {
          color: 'text.secondary',
          maxWidth: '50%',
          textAlign: { xs: 'center', md: 'left' },
        },
        type: 'body1',
      },
      {
        gridItemProps: {
          xs: 12,
          md: 4,
          sx: { textAlign: { xs: 'center', md: 'left' } },
        },
        gridItems: items.map((item) => {
          return {
            xs: 12,
            md: 4,
            items: renderFeaturedIndustryBlockItem({
              disableHref,
              item: {
                href: `${routeConfig?.INDUSTRYS}/${item.slug}`,
                ...item,
              },
            }),
          }
        }),
        sx: { mt: { xs: 4, md: 8 } },
        type: 'grid',
      },
    ],
    ...rest,
  }
}

export default renderFeaturedIndustrysBlock
