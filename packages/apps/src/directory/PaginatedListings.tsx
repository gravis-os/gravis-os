import React from 'react'
import {
  PaginatedQueryView,
  PaginatedQueryViewProps,
  PaginatedQueryViewVariantEnum,
} from '@gravis-os/query'
import ListingCard, { ListingCardProps } from './ListingCard'
import ListingListItem, { ListingListItemProps } from './ListingListItem'

const renderItemByVariant = (props) => {
  const { variant } = props
  switch (variant) {
    case PaginatedQueryViewVariantEnum.List:
      return <ListingListItem {...(props as unknown as ListingListItemProps)} />
    case PaginatedQueryViewVariantEnum.Grid:
    default:
      return <ListingCard {...(props as unknown as ListingCardProps)} />
  }
}

export interface PaginatedListingsProps
  extends Omit<PaginatedQueryViewProps, 'renderItem'> {
  renderItem?: PaginatedQueryViewProps['renderItem']
}

const PaginatedListings: React.FC<PaginatedListingsProps> = (props) => {
  return <PaginatedQueryView {...props} renderItem={renderItemByVariant} />
}

export default PaginatedListings
