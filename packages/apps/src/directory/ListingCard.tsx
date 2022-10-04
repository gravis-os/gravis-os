import React from 'react'
import { Card, CardContent, CardProps, Link, Typography } from '@gravis-os/ui'
import { CrudModule } from '@gravis-os/types'
import { StorageImage } from '@gravis-os/storage'
import { Listing } from './types'

export interface ListingCardProps extends CardProps {
  item: Listing
  brandModule: CrudModule | any
  listingModule: CrudModule | any
}

const ListingCard: React.FC<ListingCardProps> = (props) => {
  const { item, brandModule, listingModule, sx, ...rest } = props

  if (!item) return null

  const listingHref = listingModule.getWebHref([
    item.directory_category.directory,
    item.directory_category,
    item,
  ])

  return (
    <Card
      key={item.id}
      disableCardContent
      square
      sx={{ height: '100%', ...sx }}
      {...rest}
    >
      <Link href={listingHref}>
        <StorageImage
          src={item.avatar_src}
          alt={item.avatar_alt || item.title}
          width={560}
          height={560}
        />
      </Link>

      <CardContent disableGutterBottom sx={{ height: '100%' }}>
        <Link href={brandModule.getWebHref([item.brand])}>
          <Typography variant="overline">{item.brand?.title}</Typography>
        </Link>
        <Link href={listingHref}>
          <Typography variant="h4">{item.title}</Typography>
        </Link>
        <Typography>{item.subtitle}</Typography>
      </CardContent>
    </Card>
  )
}

export default ListingCard
