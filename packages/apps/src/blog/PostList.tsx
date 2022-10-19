import React from 'react'
import PostListItem, { PostListItemProps } from './PostListItem'
import { Post } from './types'

export interface PostListProps {
  items?: Post[]
  itemProps?: Record<string, any>
}

const PostList: React.FC<PostListProps> = (props) => {
  const { items, itemProps } = props
  return (
    <div>
      {items.map((item) => {
        return (
          <PostListItem
            key={item.id}
            item={item}
            {...(itemProps as PostListItemProps)}
          />
        )
      })}
    </div>
  )
}

export default PostList
