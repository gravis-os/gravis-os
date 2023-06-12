import { BlockItemProps } from '@gravis-os/landing'

export interface RenderShowcaseStickyGridBlockItemProps {
  mode?: 'light' | 'dark'
  title: BlockItemProps['title']
  subtitle?: BlockItemProps['title']
  hero_src?: string
  hero_alt?: string
  reverse?: boolean
}

const renderShowcaseStickyGridBlockItem = (
  props: RenderShowcaseStickyGridBlockItemProps
) => {
  const { mode, hero_src, hero_alt, title, subtitle, reverse } = props

  const gridItems = [
    {
      md: 6,
      lg: 7,
      items: [
        hero_src && {
          type: 'image',
          title: hero_src,
          boxProps: { sx: { display: 'flex', justifyContent: 'center' } },
          titleProps: {
            alt: hero_alt,
            fill: true,
            boxSx: { width: '100%' },
          },
        },
      ],
    },
    {
      md: 6,
      lg: 5,
      boxProps: {
        sx: {
          position: 'sticky',
          top: 0,
          pt: { xs: 4, md: 7, lg: 9 },
        },
      },
      items: [
        {
          type: 'h3',
          title,
          titleProps: {
            color: 'text.primary',
            mb: 1,
          },
        },
        subtitle && {
          type: 'subtitle1',
          title: subtitle,
          titleProps: {
            color: 'text.secondary',
            maxWidth: true,
          },
        },
      ],
    },
  ]

  const nextGridItems = reverse ? gridItems.slice().reverse() : gridItems

  return {
    type: 'grid',
    boxProps: { sx: { backgroundColor: 'background.default' } },
    mode,
    gridProps: {
      reverse: { xs: !reverse, md: reverse },
      spacing: 6,
      sx: { textAlign: { xs: 'center', md: 'left' } },
    },
    gridItems: nextGridItems,
  }
}

export default renderShowcaseStickyGridBlockItem
