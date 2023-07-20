import { ClientTestimonial } from '@gravis-os/types'
import { useLayout } from '../providers/LayoutProvider'
import { BlockProps } from '../web/Block/Block'
import { BlockItemProps } from '../web/Block/BlockItem'
import renderFeaturedIndustryBlockItem from './renderFeaturedIndustryBlockItem'

export interface RenderFeaturedIndustrysBlockProps
  extends Omit<BlockProps, 'items' | 'title'> {
  items: ClientTestimonial[]
  title?: React.ReactNode
  titleType?: BlockItemProps['type']
  subtitle?: React.ReactNode
}

const renderFeaturedIndustrysBlock = (
  props: RenderFeaturedIndustrysBlockProps
) => {
  const {
    title = 'Featured Industries',
    titleType = 'h3',
    subtitle = '',
    items,
    ...rest
  } = props
  const { routeConfig } = useLayout()

  return {
    key: 'featured-industrys',
    items: [
      {
        type: 'overline',
        title: 'Industries',
        titleProps: {
          textAlign: { xs: 'center', md: 'left' },
        },
      },
      {
        type: titleType,
        title,
        titleProps: {
          gutterBottom: true,
          textAlign: { xs: 'center', md: 'left' },
        },
      },
      {
        type: 'body1',
        title: subtitle,
        titleProps: {
          color: 'text.secondary',
          maxWidth: '50%',
          textAlign: { xs: 'center', md: 'left' },
        },
      },
      {
        type: 'grid',
        sx: { mt: { xs: 4, md: 8 } },
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
              item: {
                href: `${routeConfig?.INDUSTRYS}/${item.slug}`,
                ...item,
              },
            }),
          }
        }),
      },
    ],
    ...rest,
  }
}

export default renderFeaturedIndustrysBlock
