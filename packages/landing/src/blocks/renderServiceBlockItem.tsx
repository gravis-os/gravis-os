import { Service } from '@gravis-os/types'

export interface RenderServiceBlockItemProps {
  item: Service & { href: string }
}

const renderServiceBlockItem = (props: RenderServiceBlockItemProps) => {
  const { item } = props
  const { title, href, subtitle } = item || {}

  return {
    sm: 6,
    md: 4,
    items: [
      { title, titleProps: { href, variant: 'h5' }, type: 'link' },
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

export default renderServiceBlockItem
