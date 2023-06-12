import { BlockItemProps } from '@gravis-os/landing'

export interface RenderHeaderMenuListBlockItemProps {
  title: BlockItemProps['title']
  subtitle?: BlockItemProps['title']
  href?: string
  items?: Array<{
    title: BlockItemProps['title']
    href?: BlockItemProps['boxProps']['href']
  }>
}

const renderHeaderMenuListBlockItem = (
  props: RenderHeaderMenuListBlockItemProps
) => {
  const { title, subtitle, href, items = [] } = props
  return {
    items: [
      {
        type: 'link',
        title,
        titleProps: {
          variant: 'h6' as const,
          href,
          sx: { mb: 0.5 },
        },
      },
      {
        type: 'body2',
        title: subtitle,
        titleProps: { color: 'text.secondary', sx: { mb: 2 } },
      },
      ...(items.map((item) => ({
        type: 'link',
        title: item.title,
        titleProps: {
          href: item.href,
          variant: 'body1',
          gutterBottom: true,
        },
        ...item,
      })) as BlockItemProps[]),
    ],
  }
}

export default renderHeaderMenuListBlockItem
