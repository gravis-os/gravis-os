import { BlockProps } from '../web/Block/Block'
import renderGhostButtonBlockItem, {
  RenderGhostButtonBlockItemProps,
} from './renderGhostButtonBlockItem'

export interface RenderHeroWithBackgroundBlockProps
  extends Omit<BlockProps, 'items'> {
  buttonProps?: RenderGhostButtonBlockItemProps
  hero_alt?: string
  hero_src?: string
  overline?: string
  secondaryButtonProps?: RenderGhostButtonBlockItemProps
  subtitle?: string
  title: string
}

const renderHeroWithBackgroundBlock = (
  props: RenderHeroWithBackgroundBlockProps
) => {
  const {
    title,
    buttonProps,
    center = true,
    hero_alt,
    hero_src,
    overline,
    secondaryButtonProps,
    subtitle,
    ...rest
  } = props

  return {
    id: 'hero-with-background',
    center,
    dark: true,
    maxWidth: 'md',
    py: { xs: 15, md: 30 },
    ...(hero_src && {
      backgroundImageProps: { alt: hero_alt, priority: true, src: hero_src },
    }),
    items: [
      { title: overline, type: 'overline' },
      {
        title,
        titleProps: { gutterBottom: true, maxWidth: !center && '60%' },
        type: 'h1',
      },
      {
        title: subtitle,
        titleProps: { color: 'text.secondary', maxWidth: center || '45%' },
        type: 'subtitle1',
      },
      (buttonProps || secondaryButtonProps) && {
        stackItems: [
          {
            items: [renderGhostButtonBlockItem(buttonProps)],
          },
          secondaryButtonProps && {
            items: [renderGhostButtonBlockItem(secondaryButtonProps)],
          },
        ],
        stackProps: {
          center,
          direction: 'row' as const,
          reverseDirectionOnMobile: true,
          spacing: 0,
        },
        sx: { mt: 4 },
        type: 'stack',
      },
    ],
    ...rest,
  }
}

export default renderHeroWithBackgroundBlock
