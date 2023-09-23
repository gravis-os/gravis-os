import { BlockProps } from '../web/Block/Block'

export interface RenderHeroBlockProps extends BlockProps {
  item: {
    hero_alt?: string
    hero_src?: string
    subtitle?: string
    title: string
  }
}

const renderHeroBlock = (props: RenderHeroBlockProps) => {
  const { item, ...rest } = props
  const { title, hero_alt, hero_src, subtitle } = item || {}
  return {
    id: 'hero',
    pb: 0,
    pt: { xs: 4, md: 8 },
    sx: { backgroundColor: 'background.paper' },
    ...rest,
    items: [
      { title, type: 'h1' },
      {
        title: subtitle,
        titleProps: {
          maxWidth: true,
          sx: { mt: { xs: 1, md: 3 } },
        },
        type: 'subtitle1',
      },
      {
        title: hero_src,
        disableContainer: true,
        titleProps: {
          alt: hero_alt,
          background: true,
          backgroundHeight: { xs: 400, md: 600 },
          backgroundSx: { mt: { xs: 5, md: 10 } },
          priority: true,
        },
        type: 'image',
      },
    ],
  }
}

export default renderHeroBlock
