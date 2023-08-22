import React from 'react'
import {
  Box,
  Card,
  CardContent,
  CardProps,
  Link,
  Stack,
  Typography,
} from '@gravis-os/ui'
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

  const {
    title,
    avatar_src,
    avatar_alt,
    brand,
    directory_category,
    priceText,
  } = item
  const { directory } = directory_category
  const {
    is_listing_image_enabled,
    is_listing_price_enabled,
    is_listing_brand_image_enabled,
  } = directory
  const listingHref = listingModule.getWebHref([
    directory,
    directory_category,
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
      {is_listing_image_enabled && (
        <Link href={listingHref}>
          <StorageImage
            fill
            fixed
            src={avatar_src}
            alt={avatar_alt || title}
            scaleOnHover
          />
        </Link>
      )}

      <CardContent disableGutterBottom sx={{ height: '100%' }}>
        <Stack direction="row" gap={2} alignItems="center">
          {is_listing_brand_image_enabled && (
            <StorageImage src={brand?.avatar_src} width={50} height={50} />
          )}
          <Box>
            <Link
              variant="overline"
              href={brandModule.getWebHref([brand])}
              color="secondary"
            >
              {brand?.title}
            </Link>
            <Link variant="h6" href={listingHref}>
              {title}
            </Link>
            {is_listing_price_enabled && priceText && (
              <Typography variant="body2">{priceText}</Typography>
            )}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default ListingCard
