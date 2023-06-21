import React from 'react'
import { Brand, BrandCard } from '@gravis-os/apps/directory'
import { CrudModule } from '@gravis-os/types'

export interface renderBrandBlockItemProps {
  item: Brand
  brandModule: CrudModule | any
}

const renderBrandBlockItem = (props: renderBrandBlockItemProps) => {
  const { item, brandModule } = props

  return [
    {
      type: 'jsx',
      title: <BrandCard item={item} brandModule={brandModule} />,
    },
  ]
}

export default renderBrandBlockItem
