import { BlockItemProps } from '@gravis-os/landing'
import { Service, ServiceCategory } from '@gravis-os/types'

export interface RenderServiceCategoryBlockItemProps {
  item: ServiceCategory & { items: Array<Service & { href: string }> } & {
    href: string
  }
}

const renderServiceCategoryBlockItem = (
  props: RenderServiceCategoryBlockItemProps
) => {
  const { item } = props
  const { title, subtitle, href, items } = item || {}

  return {
    sm: 12,
    md: 6,
    items: [
      {
        type: 'link',
        title,
        titleProps: {
          variant: 'h3' as const,
          href,
          underline: 'none',
          sx: { mb: 1 },
        },
      },
      {
        type: 'subtitle1',
        title: subtitle,
        titleProps: {
          maxLines: 2,
          color: 'text.secondary',
          maxWidth: true,
          sx: { mb: 2 },
        },
      },
      ...(items.map((item) => ({
        type: 'link',
        title: item.title,
        titleProps: {
          href: item.href,
          variant: 'h6',
          rightCaretFullWidth: true,
          underline: 'none',
          sx: {
            py: 2.5,
            px: 2,
            borderBottom: 1,
            borderColor: 'divider',
            '&:hover': { backgroundColor: 'action.hover' },
          },
        },
        ...item,
      })) as BlockItemProps[]),
    ],
  }
}

export default renderServiceCategoryBlockItem
