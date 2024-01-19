import { BlockProps } from '../web/Block/Block'
import { BlockItemProps } from '../web/Block/BlockItem'
import renderGhostButtonBlockItem, {
  RenderGhostButtonBlockItemProps,
} from './renderGhostButtonBlockItem'

export interface RenderHeroWithVideoBackgroundBlockProps
  extends Omit<BlockProps, 'items'> {
  buttonProps?: RenderGhostButtonBlockItemProps
  overline?: string
  secondaryButtonProps?: RenderGhostButtonBlockItemProps
  subtitle?: string
  subtitleProps?: BlockItemProps
  title: string
  video_poster_src?: string
  video_src?: string
}

const renderHeroWithVideoBackgroundBlock = (
  props: RenderHeroWithVideoBackgroundBlockProps
) => {
  const {
    title,
    buttonProps,
    center = true,
    overline,
    secondaryButtonProps,
    subtitle,
    subtitleProps,
    video_poster_src,
    video_src,
    ...rest
  } = props

  return {
    id: 'hero-with-background',
    center,
    dark: true,
    maxWidth: 'md',
    pb: 30,
    pt: 30,
    ...(video_src && {
      backgroundOverlayOpacity: 0.5,
      backgroundVideoProps: { poster: video_poster_src, src: video_src },
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
        titleProps: {
          color: 'text.secondary',
          maxWidth: center || '45%',
          ...subtitleProps,
        },
        type: 'subtitle1',
      },
      {
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

export default renderHeroWithVideoBackgroundBlock
