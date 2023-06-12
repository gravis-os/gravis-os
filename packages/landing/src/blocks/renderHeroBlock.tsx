import { BlockProps } from '@gravis-os/landing'

export interface RenderHeroBlockProps extends BlockProps {
  item: {
    title: string
    subtitle?: string
    hero_src?: string
    hero_alt?: string
  }
}

const renderHeroBlock = (props: RenderHeroBlockProps) => {
  const { item, ...rest } = props
  const { title, subtitle, hero_src, hero_alt } = item || {}
  return {
    key: 'hero',
    pb: 0,
    pt: { xs: 4, md: 8 },
    sx: { backgroundColor: 'background.paper' },
    ...rest,
    items: [
      { type: 'h1', title },
      {
        type: 'subtitle1',
        title: subtitle,
        titleProps: {
          maxWidth: true,
          sx: { mt: { xs: 1, md: 3 } },
        },
      },
      {
        type: 'image',
        title: hero_src,
        disableContainer: true,
        titleProps: {
          alt: hero_alt,
          background: true,
          backgroundHeight: { xs: 400, md: 600 },
          backgroundSx: { mt: { xs: 5, md: 10 } },
        },
      },
    ],
  }
}

export default renderHeroBlock
