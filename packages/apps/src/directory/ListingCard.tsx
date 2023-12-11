import React from 'react'

import { StorageImage } from '@gravis-os/storage'
import { CrudModule } from '@gravis-os/types'
import {
  Box,
  Card,
  CardContent,
  CardProps,
  Link,
  Stack,
  Typography,
} from '@gravis-os/ui'

import { Listing } from './types'

export interface ListingCardProps extends CardProps {
  brandModule: CrudModule | any
  item: Listing
  listingModule: CrudModule | any
}

const ListingCard: React.FC<ListingCardProps> = (props) => {
  const { brandModule, item, listingModule, sx, ...rest } = props

  if (!item) return null

  const {
    id,
    title,
    avatar_alt,
    avatar_src,
    brand,
    directory_category,
    priceText,
  } = item
  const { directory } = directory_category
  const {
    is_listing_brand_image_enabled,
    is_listing_image_enabled,
    is_listing_price_enabled,
  } = directory
  const listingHref = listingModule.getWebHref([
    directory,
    directory_category,
    item,
  ])

  return (
    <Card
      disableCardContent
      key={id}
      square
      sx={{ height: '100%', ...sx }}
      {...rest}
    >
      <Box />
      {is_listing_brand_image_enabled && (
        <Link href={listingHref}>
          <StorageImage
            alt={brand?.title}
            fixed
            height={50}
            src={brand?.hero_src || '/temp/placeholder.png'}
            sx={{
              backgroundColor: 'background.muted',
              height: '120px !important',
              minWidth: '100%',
            }}
            width={50}
          />
        </Link>
      )}
      {is_listing_image_enabled && (
        <Link href={listingHref}>
          <StorageImage
            alt={avatar_alt || title}
            fill
            fixed
            scaleOnHover
            src={avatar_src}
          />
        </Link>
      )}

      <CardContent
        disableGutterBottom
        sx={{ height: '100%', mt: is_listing_brand_image_enabled ? -4 : 0 }}
      >
        <Stack gap={2}>
          {is_listing_brand_image_enabled && (
            <Link href={listingHref}>
              <StorageImage height={50} src={brand?.avatar_src} width={50} />
            </Link>
          )}
          <Box>
            <Link
              color="secondary"
              href={brandModule.getWebHref([brand])}
              variant="overline"
            >
              {brand?.title}
            </Link>
            <Link href={listingHref} variant="h6">
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
