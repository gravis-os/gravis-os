import { BlockProps } from '@gravis-os/landing'
import renderGhostButtonBlockItem, {
  RenderGhostButtonBlockItemProps,
} from './renderGhostButtonBlockItem'

export interface RenderHeroWithVideoBackgroundBlockProps
  extends Omit<BlockProps, 'items'> {
  overline?: string
  title: string
  subtitle?: string
  video_src?: string
  video_poster_src?: string
  buttonProps?: RenderGhostButtonBlockItemProps
  secondaryButtonProps?: RenderGhostButtonBlockItemProps
}

const renderHeroWithVideoBackgroundBlock = (
  props: RenderHeroWithVideoBackgroundBlockProps
) => {
  const {
    overline,
    title,
    subtitle,
    video_src,
    video_poster_src,
    buttonProps,
    center = true,
    secondaryButtonProps,
    ...rest
  } = props

  return {
    key: 'hero-with-background',
    pt: 30,
    pb: 30,
    dark: true,
    center,
    maxWidth: 'md',
    ...(video_src && {
      backgroundVideoProps: { src: video_src, poster: video_poster_src },
      backgroundOverlayOpacity: 0.5,
    }),
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
      {
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

export default renderHeroWithVideoBackgroundBlock
