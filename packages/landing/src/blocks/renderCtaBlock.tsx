import { useLayout } from '../providers/LayoutProvider'
import { BlockProps } from '../web/Block/Block'
import renderGhostButtonBlockItem from './renderGhostButtonBlockItem'

export interface RenderCtaBlockProps extends BlockProps {
  item: {
    title: string
    overline?: string
    subtitle?: string
    hero_src?: string
    hero_alt?: string
  }
}

const renderCtaBlock = (props: RenderCtaBlockProps) => {
  const { item, ...rest } = props
  const { overline, title, subtitle, hero_src, hero_alt } = item || {}
  const { routeConfig } = useLayout()

  return {
    id: title,
    center: true,
    maxWidth: 'md',
    items: [
      { type: 'overline', title: overline },
      {
        type: 'h3',
        title,
        titleProps: { type: 'h3', maxWidth: 'xl', gutterBottom: true },
      },
      {
        type: 'body1',
        title: subtitle,
        titleProps: {
          color: 'text.secondary',
        },
      },
      renderGhostButtonBlockItem({
        boxProps: { mt: 3 },
        overline: 'Contact Us',
        title: 'Get in Touch',
        href: `/${routeConfig?.CONTACT}`,
      }),
      {
        type: 'image',
        title: hero_src,
        disableContainer: true,
        titleProps: {
          alt: hero_alt,
          background: true,
          backgroundHeight: { xs: 480, md: 640 },
          backgroundSx: { mt: { xs: 4, md: 8 } },
        },
      },
    ],
    ...rest,
  }
}

export default renderCtaBlock
