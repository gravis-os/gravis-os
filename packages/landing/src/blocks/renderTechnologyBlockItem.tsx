import { Technology } from '@gravis-os/types'

export interface RenderTechnologyBlockItemProps {
  item: Technology & { href: string }
}

const renderTechnologyBlockItem = (props: RenderTechnologyBlockItemProps) => {
  const { item } = props
  const {
    title,
    subtitle,
    href,
    avatar_src,
    avatar_alt,
    avatar_width = 56,
    avatar_height = 56,
  } = item || {}

  return {
    xs: 6,
    md: 4,
    lg: 3,
    items: [
      {
        type: 'image',
        title: avatar_src,
        titleProps: {
          alt: avatar_alt,
          width: avatar_width,
          height: avatar_height,
          sx: { mb: 1 },
        },
      },
      { type: 'link', title, titleProps: { href, variant: 'subtitle2' } },
      {
        type: 'body1',
        title: subtitle,
        titleProps: {
          maxLines: 2,
          maxWidth: true,
          color: 'text.secondary',
          sx: { mt: 1, mb: 2 },
        },
      },
      {
        type: 'link',
        title: 'Learn more',
        titleProps: { href, rightCaret: true, variant: 'body2' },
      },
    ],
  }
}

export default renderTechnologyBlockItem
