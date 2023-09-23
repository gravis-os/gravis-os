import { BlockItemProps } from '../web/Block/BlockItem'
import renderGhostButtonBlockItem, {
  RenderGhostButtonBlockItemProps,
} from './renderGhostButtonBlockItem'

export interface RenderFadeToBottomBackgroundImageBlockProps {
  buttonProps?: RenderGhostButtonBlockItemProps
  hero_alt?: string
  hero_src?: string
  overline?: string
  subtitle?: string
  subtitleProps?: BlockItemProps
  title: string
  titleProps?: BlockItemProps
}

const renderFadeToBottomBackgroundImageBlock = (
  props: RenderFadeToBottomBackgroundImageBlockProps
) => {
  const {
    title,
    buttonProps,
    hero_alt,
    hero_src,
    overline,
    subtitle,
    subtitleProps,
    titleProps,
  } = props
  return {
    id: title,
    backgroundImageProps: {
      alt: hero_alt,
      src: hero_src,
    },
    center: true,
    dark: true,
    items: [
      { title: overline, type: 'overline' },
      {
        title,
        maxWidth: 'sm',
        type: 'h4',
        ...titleProps,
        titleProps: { gutterBottom: true, ...titleProps?.titleProps },
      },
      {
        title: subtitle,
        maxWidth: 'md',
        type: 'h6',
        ...subtitleProps,
        titleProps: {
          color: 'text.secondary',
          maxWidth: true,
          ...subtitleProps?.titleProps,
        },
      },
      renderGhostButtonBlockItem({
        title: 'Enabling Smarter Businesses',
        boxProps: { mt: 3 },
        overline: 'Our Mission',
        ...buttonProps,
      }),
    ],
    pb: 46,
  }
}

export default renderFadeToBottomBackgroundImageBlock
