import React from 'react'
import { Listing, ListingCard } from '@gravis-os/apps/directory'
import { CrudModule } from '@gravis-os/types'

export interface RenderListingCardsBlockItemProps {
  item: Listing
  brandModule: CrudModule | any
  listingModule: CrudModule | any
}

const renderListingCardsBlockItem = (
  props: RenderListingCardsBlockItemProps
) => {
  const { item, brandModule, listingModule } = props

  return [
    {
      type: 'jsx',
      title: (
        <ListingCard
          stretch
          item={item}
          brandModule={brandModule}
          listingModule={listingModule}
        />
      ),
    },
  ]
}

export default renderListingCardsBlockItem
