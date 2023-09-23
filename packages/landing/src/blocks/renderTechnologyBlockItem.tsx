import { Technology } from '@gravis-os/types'

export interface RenderTechnologyBlockItemProps {
  item: Technology & { href: string }
}

const renderTechnologyBlockItem = (props: RenderTechnologyBlockItemProps) => {
  const { item } = props
  const {
    title,
    avatar_alt,
    avatar_height = 56,
    avatar_src,
    avatar_width = 56,
    href,
    subtitle,
  } = item || {}

  return {
    xs: 6,
    md: 4,
    lg: 3,
    items: [
      {
        title: avatar_src,
        titleProps: {
          alt: avatar_alt,
          height: avatar_height,
          sx: { mb: 1 },
          width: avatar_width,
        },
        type: 'image',
      },
      { title, titleProps: { href, variant: 'subtitle2' }, type: 'link' },
      {
        title: subtitle,
        titleProps: {
          color: 'text.secondary',
          maxLines: 2,
          maxWidth: true,
          sx: { mb: 2, mt: 1 },
        },
        type: 'body1',
      },
      {
        title: 'Learn more',
        titleProps: { href, rightCaret: true, variant: 'body2' },
        type: 'link',
      },
    ],
  }
}

export default renderTechnologyBlockItem
