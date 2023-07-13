import { ClientTestimonial } from '@gravis-os/types'
import { useLayout } from '../providers/LayoutProvider'
import { BlockProps } from '../web/Block/Block'
import renderFeaturedIndustryBlockItem from './renderFeaturedIndustryBlockItem'

export interface RenderFeaturedIndustrysBlockProps
  extends Omit<BlockProps, 'items' | 'title'> {
  items: ClientTestimonial[]
  title?: React.ReactNode
  subtitle?: React.ReactNode
}

const renderFeaturedIndustrysBlock = (
  props: RenderFeaturedIndustrysBlockProps
) => {
  const { title = 'Featured Industries', subtitle = '', items, ...rest } = props
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
        type: 'h3',
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
