import { useLayout } from '../providers/LayoutProvider'
import { BlockProps } from '../web/Block/Block'
import renderGhostButtonBlockItem from './renderGhostButtonBlockItem'

export interface RenderCtaBlockProps extends BlockProps {
  item: {
    hero_alt?: string
    hero_src?: string
    overline?: string
    subtitle?: string
    title: string
  }
}

const renderCtaBlock = (props: RenderCtaBlockProps) => {
  const { item, ...rest } = props
  const { title, hero_alt, hero_src, overline, subtitle } = item || {}
  const { routeConfig } = useLayout()

  return {
    id: title,
    center: true,
    items: [
      { title: overline, type: 'overline' },
      {
        title,
        titleProps: { gutterBottom: true, maxWidth: 'xl', type: 'h3' },
        type: 'h3',
      },
      {
        title: subtitle,
        titleProps: {
          color: 'text.secondary',
        },
        type: 'body1',
      },
      renderGhostButtonBlockItem({
        title: 'Get in Touch',
        boxProps: { mt: 3 },
        href: `/${routeConfig?.CONTACT}`,
        overline: 'Contact Us',
      }),
      {
        title: hero_src,
        disableContainer: true,
        titleProps: {
          alt: hero_alt,
          background: true,
          backgroundHeight: { xs: 480, md: 640 },
          backgroundSx: { mt: { xs: 4, md: 8 } },
        },
        type: 'image',
      },
    ],
    maxWidth: 'md',
    ...rest,
  }
}

export default renderCtaBlock
