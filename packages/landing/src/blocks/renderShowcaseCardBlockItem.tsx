import { Showcase, useLayout } from '@gravis-os/landing'
import renderGhostButtonBlockItem from './renderGhostButtonBlockItem'

export interface RenderShowcaseCardBlockItemProps {
  item: Showcase
  isHero?: boolean
}

const renderShowcaseCardBlockItem = (
  props: RenderShowcaseCardBlockItemProps
) => {
  const { item, isHero } = props
  const {
    slug,
    backgroundColor,
    mode,
    hero_src,
    title,
    subtitle,
    reverse,
    hero_alt,
    sections,
  } = item || {}
  const { routeConfig } = useLayout()

  const gridItems = [
    {
      // Image
      md: 6,
      lg: 7,
      sx: {
        height: { xs: 300, md: 500 },
        position: 'relative',
        overflow: 'hidden',
      },
      items: [
        {
          type: 'image',
          title: hero_src,
          boxProps: { sx: { display: 'flex', justifyContent: 'center' } },
          titleProps: {
            alt: hero_alt || 'image-src',
            background: true,
            fixedBackground: true,
            scaleOnHover: true,
            boxSx: {
              height: '100%',
              bottom: -8,
            },
          },
        },
      ],
    },
    {
      // Text
      md: 6,
      lg: 5,
      boxProps: {
        sx: {
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
          type: isHero ? 'h2' : 'h3',
          title,
          titleProps: {
            color: 'text.primary',
            gutterBottom: true,
            component: isHero ? 'h1' : 'h3',
          },
        },
        {
          type: 'subtitle3',
          title: subtitle,
          titleProps: {
            color: 'text.secondary',
          },
        },
        !isHero &&
          (sections.leftGridSticky?.items?.length ||
            sections.rightGridSticky?.items?.length ||
            sections.gallery?.items?.length) &&
          renderGhostButtonBlockItem({
            overline: 'Showcase',
            title: 'Read more',
            boxProps: { mt: 5, mb: { xs: 5, md: 0 } },
            href: `${routeConfig?.SHOWCASES}/${slug || ''}`,
          }),
      ],
    },
  ]

  const nextGridItems = reverse ? gridItems.slice().reverse() : gridItems

  return {
    type: 'grid',
    maxWidth: 'xl',
    sx: { mt: { xs: isHero ? 4 : 6, md: isHero ? 6 : 8 } },
    mode,
    boxProps: { sx: { backgroundColor, borderRadius: 1 } },
    gridProps: {
      reverse: { xs: !reverse, md: reverse },
      spacing: 3,
      sx: { textAlign: { xs: 'center', md: 'left' } },
    },
    gridItems: nextGridItems,
  }
}

export default renderShowcaseCardBlockItem
