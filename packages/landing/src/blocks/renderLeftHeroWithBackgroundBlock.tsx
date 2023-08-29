import { BlockItemProps } from '../web/Block/BlockItem'
import { BlockProps } from '../web/Block/Block'
import renderGhostButtonBlockItem, {
  RenderGhostButtonBlockItemProps,
} from './renderGhostButtonBlockItem'

export interface RenderLeftHeroWithBackgroundBlockProps
  extends Omit<BlockProps, 'items'> {
  overline?: string
  title: string
  titleProps?: BlockItemProps['titleProps']
  subtitle?: string
  hero_src?: string
  hero_alt?: string
  image_src?: string
  image_alt?: string
  imageProps?: BlockItemProps['titleProps']
  buttonProps?: RenderGhostButtonBlockItemProps
  overlineProps?: BlockItemProps['titleProps']
}

const renderLeftHeroWithBackgroundBlock = (
  props: RenderLeftHeroWithBackgroundBlockProps
) => {
  const {
    overline,
    title,
    titleProps,
    subtitle,
    hero_src,
    hero_alt,
    image_src,
    image_alt,
    imageProps,
    buttonProps,
    overlineProps,
    center = false,
    pb,
    ...rest
  } = props

  return {
    id: 'hero-with-background',
    pt: 30,
    pb: 0,
    centerOnMobile: true,
    dark: true,
    center,
    ...(hero_src && {
      backgroundImageProps: { src: hero_src, alt: hero_alt, priority: true },
    }),
    items: [
      {
        type: 'grid',
        gridProps: {
          sx: { position: 'relative' },
          spacing: 2,
        },
        gridItems: [
          {
            xs: 12,
            md: 6,
            sx: { pb },
            items: [
              { type: 'overline', title: overline, titleProps: overlineProps },
              {
                type: 'h1',
                title,
                titleProps: { gutterBottom: true, ...titleProps },
              },
              {
                type: 'subtitle1',
                title: subtitle,
                titleProps: {
                  color: 'text.secondary',
                  sx: { mb: 4 },
                  maxWidth: '90%',
                },
              },
              buttonProps && renderGhostButtonBlockItem(buttonProps),
            ],
          },
          {
            xs: 12,
            md: 6,
            sx: {
              width: '100%',
              display: 'flex',
              justifyContent: { xs: 'center', md: 'flex-end' },
              position: { lg: 'absolute' },
              bottom: -16,
              right: 0,
              mb: { xs: -2, md: 0 },
            },
            boxProps: { width: { xs: '95%', md: '100%' } },
            items: [
              {
                type: 'storage_image',
                title: image_src,
                titleProps: {
                  alt: image_alt,
                  priority: true,
                  ...imageProps,
                },
              },
            ],
          },
        ],
      },
    ],
    ...rest,
  }
}

export default renderLeftHeroWithBackgroundBlock
