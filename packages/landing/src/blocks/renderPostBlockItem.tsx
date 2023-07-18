import { Post } from '@gravis-os/types'
import { BlockItemProps } from 'src/web'

export interface RenderPostBlockItemProps {
  item: Post & { href: string }
  fromStorage?: boolean
  itemProps?: BlockItemProps['gridItemProps']
}

const renderPostBlockItem = (props: RenderPostBlockItemProps) => {
  const { item, fromStorage, itemProps = {} } = props
  const { title, subtitle, href, avatar_src, avatar_alt, hero_src, hero_alt } =
    item || {}

  return {
    xs: 12,
    sm: 6,
    md: 4,
    items: [
      {
        type: fromStorage ? 'storage_image' : 'image',
        title: hero_src || avatar_src,
        titleProps: {
          alt: hero_alt || avatar_alt,
          ar: '16:9',
          scaleOnHover: true,
          boxProps: { sx: { mb: 2 }, href },
        },
      },
      { type: 'link', title, titleProps: { href, variant: 'h5' } },
      {
        type: 'body1',
        title: subtitle,
        titleProps: {
          maxLines: 2,
          color: 'text.secondary',
          sx: { mt: 1, mb: 2 },
        },
      },
      {
        type: 'link',
        title: 'Read more',
        titleProps: { href, rightCaret: true, variant: 'body2' },
      },
    ],
    ...itemProps,
  }
}

export default renderPostBlockItem
