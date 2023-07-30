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
  const { title, href, subtitle, description, items } = item || {}

  return {
    sm: 12,
    md: 12,
    items: [
      {
        type: 'link',
        title,
        titleProps: {
          variant: 'overline' as const,
          href,
          color: 'text.secondary',
          sx: { mb: 1 },
        },
      },
      { type: 'h3', title: description },
      {
        type: 'subtitle1',
        title: subtitle,
        titleProps: {
          maxLines: 2,
          color: 'text.secondary',
          maxWidth: true,
          sx: { mt: 1, mb: 4 },
        },
      },
      {
        type: 'grid',
        gridItems: orderBy(items, 'published_at', 'desc').map((item) =>
          renderPostBlockItem({
            item,
          })
        ),
      },
    ],
  }
}

export default renderPostCategoryBlockItem
