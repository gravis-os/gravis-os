import { Post, PostCategory } from '@gravis-os/types'
import orderBy from 'lodash/orderBy'

import renderPostBlockItem from './renderPostBlockItem'

export interface RenderPostCategoryBlockItemProps {
  item: PostCategory & { items: Array<Post & { href: string }> } & {
    href: string
  }
}

const renderPostCategoryBlockItem = (
  props: RenderPostCategoryBlockItemProps
) => {
  const { item } = props
  const { title, description, href, items, subtitle } = item || {}

  return {
    sm: 12,
    md: 12,
    items: [
      {
        title,
        titleProps: {
          color: 'text.secondary',
          href,
          sx: { mb: 1 },
          variant: 'overline' as const,
        },
        type: 'link',
      },
      { title: description, type: 'h3' },
      {
        title: subtitle,
        titleProps: {
          color: 'text.secondary',
          maxLines: 2,
          maxWidth: true,
          sx: { mb: 4, mt: 1 },
        },
        type: 'subtitle1',
      },
      {
        gridItems: orderBy(items, 'published_at', 'desc').map((item) =>
          renderPostBlockItem({
            item,
          })
        ),
        type: 'grid',
      },
    ],
  }
}

export default renderPostCategoryBlockItem
