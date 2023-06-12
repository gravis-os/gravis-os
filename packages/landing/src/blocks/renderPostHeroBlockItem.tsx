import { BlockItemProps, BlockProps } from '../web'

export interface RenderPostHeroBlockItemProps extends BlockProps {
  overline?: string
  overlineProps?: BlockItemProps['titleProps']
  item: {
    title: string
    subtitle?: string
    hero_src?: string
    hero_alt?: string
  }
}

const renderPostHeroBlockItem = (props: RenderPostHeroBlockItemProps) => {
  const { item, overline, overlineProps, ...rest } = props
  const { title, subtitle, hero_src, hero_alt } = item || {}

  return {
    key: 'post-hero',
    pb: 0,
    pt: { xs: 2, md: 4 },
    sx: { backgroundColor: 'background.paper' },
    ...rest,
    items: [
      overline && {
        type: 'link',
        title: overline,
        titleProps: {
          variant: 'overline',
          sx: { mb: 2 },
          color: 'text.secondary',
          ...overlineProps,
        },
      },
      { type: 'h3', title, titleProps: { component: 'h1' } },
      {
        type: 'subtitle1',
        title: subtitle,
        titleProps: {
          maxWidth: true,
          sx: { mt: 4 },
          color: 'text.secondary',
        },
      },
      {
        type: 'image',
        title: hero_src,
        titleProps: {
          alt: hero_alt,
          ar: '16:9',
          boxSx: { mt: 3 },
        },
      },
    ],
  }
}

export default renderPostHeroBlockItem
