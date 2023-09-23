import { Showcase } from '@gravis-os/types'

import { useLayout } from '../providers/LayoutProvider'
import { BlockProps } from '../web/Block/Block'
import renderGhostButtonBlockItem from './renderGhostButtonBlockItem'

export interface RenderShowcaseCardBlockItemProps
  extends Omit<BlockProps, 'items' | 'title'> {
  isHero?: boolean
  item: Showcase
}

const renderShowcaseCardBlockItem = (
  props: RenderShowcaseCardBlockItemProps
) => {
  const { isHero, item, ...rest } = props
  const {
    title,
    slug,
    backgroundColor,
    hero_alt,
    hero_src,
    mode,
    reverse,
    sections,
    subtitle,
  } = item || {}
  const { routeConfig } = useLayout()

  const gridItems = [
    {
      // Image
      md: 6,
      lg: 7,
      items: [
        {
          title: hero_src,
          boxProps: { sx: { display: 'flex', justifyContent: 'center' } },
          titleProps: {
            alt: hero_alt || 'image-src',
            background: true,
            boxSx: {
              bottom: -8,
              height: '100%',
            },
            fixedBackground: true,
            scaleOnHover: true,
          },
          type: 'image',
        },
      ],
      sx: {
        height: { xs: 300, md: 'auto' },
        overflow: 'hidden',
        position: 'relative',
      },
    },
    {
      // Text
      md: 6,
      lg: 5,
      boxProps: {
        sx: {
          mb: { xs: 2, md: 7, lg: 8 },
          mt: { xs: 2, md: 4, lg: 5 },
          mx: { xs: 3, md: 0, lg: 0 },
          [reverse ? 'ml' : 'mr']: {
            xs: 3,
            md: isHero ? 0 : 9,
            lg: isHero ? 0 : 12,
          },
        },
      },
      items: [
        {
          title,
          titleProps: {
            color: 'text.primary',
            component: isHero ? 'h1' : 'h3',
            gutterBottom: true,
          },
          type: isHero ? 'h2' : 'h3',
        },
        {
          title: subtitle,
          boxProps: {
            minHeight: 110,
          },
          titleProps: {
            color: 'text.secondary',
          },
          type: 'subtitle3',
        },
        !isHero &&
          (sections.leftGridSticky?.items?.length ||
            sections.rightGridSticky?.items?.length ||
            sections.gallery?.items?.length) &&
          renderGhostButtonBlockItem({
            title: 'Read more',
            boxProps: { mb: { xs: 5, md: 0 }, mt: 5 },
            href: `${routeConfig?.SHOWCASES}/${slug || ''}`,
            overline: 'Showcase',
          }),
      ],
    },
  ]

  // eslint-disable-next-line fp/no-mutating-methods
  const nextGridItems = reverse ? [...gridItems].reverse() : [...gridItems]

  return {
    boxProps: { sx: { backgroundColor, borderRadius: 1 } },
    gridItems: nextGridItems,
    gridProps: {
      reverse: { xs: !reverse, md: reverse },
      spacing: 3,
      sx: { textAlign: { xs: 'center', md: 'left' } },
    },
    maxWidth: 'xl',
    mode,
    sx: { mt: { xs: isHero ? 4 : 6, md: isHero ? 6 : 8 } },
    type: 'grid',
    ...rest,
  }
}

export default renderShowcaseCardBlockItem
