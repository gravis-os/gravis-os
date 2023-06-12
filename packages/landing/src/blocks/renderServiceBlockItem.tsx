import { Service } from '@gravis-os/types'

export interface RenderServiceBlockItemProps {
  item: Service & { href: string }
}

const renderServiceBlockItem = (props: RenderServiceBlockItemProps) => {
  const { item } = props
  const { title, subtitle, href } = item || {}

  return {
    sm: 6,
    md: 4,
    items: [
      { type: 'link', title, titleProps: { href, variant: 'h5' } },
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

export default renderServiceBlockItem
