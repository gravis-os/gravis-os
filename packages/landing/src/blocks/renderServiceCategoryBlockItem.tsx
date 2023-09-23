import { Service, ServiceCategory } from '@gravis-os/types'

import { BlockItemProps } from '../web/Block/BlockItem'

export interface RenderServiceCategoryBlockItemProps {
  item: ServiceCategory & { items: Array<Service & { href: string }> } & {
    href: string
  }
}

const renderServiceCategoryBlockItem = (
  props: RenderServiceCategoryBlockItemProps
) => {
  const { item } = props
  const { title, href, items, subtitle } = item || {}

  return {
    sm: 12,
    md: 6,
    items: [
      {
        title,
        titleProps: {
          href,
          sx: { mb: 1 },
          underline: 'none',
          variant: 'h3' as const,
        },
        type: 'link',
      },
      {
        title: subtitle,
        titleProps: {
          color: 'text.secondary',
          maxLines: 2,
          maxWidth: true,
          sx: { mb: 2 },
        },
        type: 'subtitle1',
      },
      ...(items.map((item) => ({
        title: item.title,
        titleProps: {
          href: item.href,
          rightCaretFullWidth: true,
          sx: {
            '&:hover': { backgroundColor: 'action.hover' },
            borderBottom: 1,
            borderColor: 'divider',
            px: 2,
            py: 2.5,
          },
          underline: 'none',
          variant: 'h6',
        },
        type: 'link',
        ...item,
      })) as BlockItemProps[]),
    ],
  }
}

export default renderServiceCategoryBlockItem
