import { BlockItemProps } from '../web/Block/BlockItem'

export interface RenderShowcaseStickyGridBlockItemProps {
  hero_alt?: string
  hero_src?: string
  mode?: 'dark' | 'light'
  reverse?: boolean
  subtitle?: BlockItemProps['title']
  title: BlockItemProps['title']
}

const renderShowcaseStickyGridBlockItem = (
  props: RenderShowcaseStickyGridBlockItemProps
) => {
  const { title, hero_alt, hero_src, mode, reverse, subtitle } = props

  const gridItems = [
    {
      md: 6,
      lg: 7,
      items: [
        hero_src && {
          title: hero_src,
          boxProps: { sx: { display: 'flex', justifyContent: 'center' } },
          titleProps: {
            alt: hero_alt,
            boxSx: { width: '100%' },
            fill: true,
          },
          type: 'image',
        },
      ],
    },
    {
      md: 6,
      lg: 5,
      boxProps: {
        sx: {
          position: 'sticky',
          pt: { xs: 4, md: 7, lg: 9 },
          top: 0,
        },
      },
      items: [
        {
          title,
          titleProps: {
            color: 'text.primary',
            mb: 1,
          },
          type: 'h3',
        },
        subtitle && {
          title: subtitle,
          titleProps: {
            color: 'text.secondary',
            maxWidth: true,
          },
          type: 'subtitle1',
        },
      ],
    },
  ]

  // eslint-disable-next-line fp/no-mutating-methods
  const nextGridItems = reverse ? [...gridItems].reverse() : [...gridItems]

  return {
    boxProps: { sx: { backgroundColor: 'background.default' } },
    gridItems: nextGridItems,
    gridProps: {
      reverse: { xs: !reverse, md: reverse },
      spacing: 6,
      sx: { textAlign: { xs: 'center', md: 'left' } },
    },
    mode,
    type: 'grid',
  }
}

export default renderShowcaseStickyGridBlockItem
