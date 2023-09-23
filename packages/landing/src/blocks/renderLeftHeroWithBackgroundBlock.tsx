import { BlockProps } from '../web/Block/Block'
import { BlockItemProps } from '../web/Block/BlockItem'
import renderGhostButtonBlockItem, {
  RenderGhostButtonBlockItemProps,
} from './renderGhostButtonBlockItem'

export interface RenderLeftHeroWithBackgroundBlockProps
  extends Omit<BlockProps, 'items'> {
  buttonProps?: RenderGhostButtonBlockItemProps
  hero_alt?: string
  hero_src?: string
  image_alt?: string
  image_src?: string
  imageProps?: BlockItemProps['titleProps']
  overline?: string
  overlineProps?: BlockItemProps['titleProps']
  subtitle?: string
  title: string
  titleProps?: BlockItemProps['titleProps']
}

const renderLeftHeroWithBackgroundBlock = (
  props: RenderLeftHeroWithBackgroundBlockProps
) => {
  const {
    title,
    buttonProps,
    center = false,
    hero_alt,
    hero_src,
    image_alt,
    image_src,
    imageProps,
    overline,
    overlineProps,
    pb,
    subtitle,
    titleProps,
    ...rest
  } = props

  return {
    id: 'hero-with-background',
    center,
    centerOnMobile: true,
    dark: true,
    pb: 0,
    pt: 30,
    ...(hero_src && {
      backgroundImageProps: { alt: hero_alt, priority: true, src: hero_src },
    }),
    items: [
      {
        gridItems: [
          {
            xs: 12,
            md: 6,
            items: [
              { title: overline, titleProps: overlineProps, type: 'overline' },
              {
                title,
                titleProps: { gutterBottom: true, ...titleProps },
                type: 'h1',
              },
              {
                title: subtitle,
                titleProps: {
                  color: 'text.secondary',
                  maxWidth: '90%',
                  sx: { mb: 4 },
                },
                type: 'subtitle1',
              },
              buttonProps && renderGhostButtonBlockItem(buttonProps),
            ],
            sx: { pb },
          },
          {
            xs: 12,
            md: 6,
            boxProps: { width: { xs: '95%', md: '100%' } },
            items: [
              {
                title: image_src,
                titleProps: {
                  alt: image_alt,
                  priority: true,
                  ...imageProps,
                },
                type: 'image',
              },
            ],
            sx: {
              bottom: -16,
              display: 'flex',
              justifyContent: { xs: 'center', md: 'flex-end' },
              mb: { xs: -2, md: 0 },
              position: { lg: 'absolute' },
              right: 0,
              width: '100%',
            },
          },
        ],
        gridProps: {
          spacing: 2,
          sx: { position: 'relative' },
        },
        type: 'grid',
      },
    ],
    ...rest,
  }
}

export default renderLeftHeroWithBackgroundBlock
