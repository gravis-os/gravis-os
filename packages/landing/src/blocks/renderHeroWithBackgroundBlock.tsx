import { BlockProps } from '@gravis-os/landing'
import renderGhostButtonBlockItem, {
  RenderGhostButtonBlockItemProps,
} from './renderGhostButtonBlockItem'

export interface RenderHeroWithBackgroundBlockProps
  extends Omit<BlockProps, 'items'> {
  overline?: string
  title: string
  subtitle?: string
  hero_src?: string
  hero_alt?: string
  buttonProps?: RenderGhostButtonBlockItemProps
  secondaryButtonProps?: RenderGhostButtonBlockItemProps
}

const renderHeroWithBackgroundBlock = (
  props: RenderHeroWithBackgroundBlockProps
) => {
  const {
    overline,
    title,
    subtitle,
    hero_src,
    hero_alt,
    buttonProps,
    center = true,
    secondaryButtonProps,
    ...rest
  } = props

  return {
    key: 'hero-with-background',
    py: { xs: 15, md: 30 },
    dark: true,
    center,
    maxWidth: 'md',
    ...(hero_src && { backgroundImageProps: { src: hero_src, alt: hero_alt } }),
    items: [
      { type: 'overline', title: overline },
      {
        type: 'h1',
        title,
        titleProps: { gutterBottom: true, maxWidth: !center && '60%' },
      },
      {
        type: 'subtitle1',
        title: subtitle,
        titleProps: { color: 'text.secondary', maxWidth: center || '45%' },
      },
      (buttonProps || secondaryButtonProps) && {
        type: 'stack',
        sx: { mt: 4 },
        stackProps: {
          spacing: 0,
          center,
          direction: 'row' as const,
          reverseDirectionOnMobile: true,
        },
        stackItems: [
          {
            items: [renderGhostButtonBlockItem(buttonProps)],
          },
          secondaryButtonProps && {
            items: [renderGhostButtonBlockItem(secondaryButtonProps)],
          },
        ],
      },
    ],
    ...rest,
  }
}

export default renderHeroWithBackgroundBlock
