import React from 'react'
import {
  PaginatedQueryView,
  PaginatedQueryViewProps,
  PaginatedQueryViewVariantEnum,
} from '@gravis-os/query'
import PostCard, { PostCardProps } from './PostCard'
import PostListItem, { PostListItemProps } from './PostListItem'

const renderItemByVariant = (props) => {
  const { variant } = props
  switch (variant) {
    case PaginatedQueryViewVariantEnum.List:
      return <PostListItem {...(props as unknown as PostListItemProps)} />
    case PaginatedQueryViewVariantEnum.Grid:
    default:
      return <PostCard {...(props as unknown as PostCardProps)} />
  }
}

export interface PaginatedPostsProps extends PaginatedQueryViewProps {}

const PaginatedPosts: React.FC<PaginatedPostsProps> = (props) => {
  return <PaginatedQueryView {...props} renderItem={renderItemByVariant} />
}

export default PaginatedPosts
