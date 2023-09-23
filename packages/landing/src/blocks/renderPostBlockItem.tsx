import { Post } from '@gravis-os/types'

import type { BlockItemProps } from '../web/Block/BlockItem'

export interface RenderPostBlockItemProps {
  fromStorage?: boolean
  item: Post & { href: string }
  itemProps?: BlockItemProps['gridItemProps']
}

const renderPostBlockItem = (props: RenderPostBlockItemProps) => {
  const { item, itemProps } = props
  const { title, avatar_alt, avatar_src, hero_alt, hero_src, href, subtitle } =
    item || {}

  return {
    xs: 12,
    sm: 6,
    md: 4,
    items: [
      {
        title: hero_src || avatar_src,
        titleProps: {
          alt: hero_alt || avatar_alt,
          ar: '16:9',
          boxProps: { href, sx: { mb: 2 } },
          scaleOnHover: true,
        },
        type: 'image',
      },
      { title, titleProps: { href, variant: 'h5' }, type: 'link' },
      {
        title: subtitle,
        titleProps: {
          color: 'text.secondary',
          maxLines: 2,
          sx: { mb: 2, mt: 1 },
        },
        type: 'body1',
      },
      {
        title: 'Read more',
        titleProps: { href, rightCaret: true, variant: 'body2' },
        type: 'link',
      },
    ],
    ...itemProps,
  }
}

export default renderPostBlockItem
