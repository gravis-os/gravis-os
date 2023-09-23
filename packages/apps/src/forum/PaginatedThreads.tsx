import React from 'react'

import {
  PaginatedQueryView,
  PaginatedQueryViewProps,
  PaginatedQueryViewVariantEnum,
} from '@gravis-os/query'

import ThreadCard, { ThreadCardProps } from './ThreadCard'
import ThreadListItem, { ThreadListItemProps } from './ThreadListItem'

const renderItemByVariant = (props) => {
  const { variant } = props
  switch (variant) {
    case PaginatedQueryViewVariantEnum.List: {
      return <ThreadListItem {...(props as unknown as ThreadListItemProps)} />
    }
    case PaginatedQueryViewVariantEnum.Grid:
    default: {
      return <ThreadCard {...(props as unknown as ThreadCardProps)} />
    }
  }
}

export interface PaginatedThreadsProps
  extends Omit<PaginatedQueryViewProps, 'renderItem'> {
  renderItem?: PaginatedQueryViewProps['renderItem']
}

const PaginatedThreads: React.FC<PaginatedThreadsProps> = (props) => {
  return <PaginatedQueryView {...props} renderItem={renderItemByVariant} />
}

export default PaginatedThreads
