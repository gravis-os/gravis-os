import { BlockItemProps } from '../web/Block/BlockItem'

export interface RenderHeaderMenuListBlockItemProps {
  href?: string
  items?: Array<{
    href?: BlockItemProps['boxProps']['href']
    title: BlockItemProps['title']
  }>
  subtitle?: BlockItemProps['title']
  title: BlockItemProps['title']
}

const renderHeaderMenuListBlockItem = (
  props: RenderHeaderMenuListBlockItemProps
) => {
  const { title, href, items = [], subtitle } = props
  return {
    items: [
      {
        title,
        titleProps: {
          href,
          sx: { mb: 0.5 },
          variant: 'h6' as const,
        },
        type: 'link',
      },
      {
        title: subtitle,
        titleProps: { color: 'text.secondary', sx: { mb: 2 } },
        type: 'body2',
      },
      ...(items.map((item) => ({
        title: item.title,
        titleProps: {
          gutterBottom: true,
          href: item.href,
          variant: 'body1',
        },
        type: 'link',
        ...item,
      })) as BlockItemProps[]),
    ],
  }
}

export default renderHeaderMenuListBlockItem
