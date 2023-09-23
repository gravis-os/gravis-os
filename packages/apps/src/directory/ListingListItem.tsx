import React from 'react'

import { StorageImage } from '@gravis-os/storage'
import { CrudModule } from '@gravis-os/types'
import {
  Box,
  BoxProps,
  Card,
  CardProps,
  Grid,
  Link,
  Typography,
} from '@gravis-os/ui'

import { Listing } from './types'

export interface ListingListItemProps extends CardProps {
  brandModule: CrudModule | any
  cardContentProps?: BoxProps
  item: Listing
  listingModule: CrudModule | any
  size?: 'large' | 'medium' | 'small'
}

const ListingListItem: React.FC<ListingListItemProps> = (props) => {
  const {
    brandModule,
    cardContentProps,
    item,
    listingModule,
    size = 'medium',
    sx,
    ...rest
  } = props

  if (!item) return null

  const isSmall = size === 'small'

  const {
    id,
    title,
    avatar_alt,
    avatar_src,
    brand,
    directory_category,
    priceText,
    subtitle,
  } = item
  const { directory } = directory_category
  const { is_listing_image_enabled, is_listing_price_enabled } = directory

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
      <Grid container spacing={2}>
        {is_listing_image_enabled && (
          <Grid item lg={isSmall ? 3 : 2} xs={3}>
            <Link href={listingHref}>
              <StorageImage
                alt={avatar_alt || title}
                fill
                fixed
                scaleOnHover
                src={avatar_src}
              />
            </Link>
          </Grid>
        )}
        <Grid item xs>
          <Box
            py={2}
            stretch
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              ...cardContentProps?.sx,
            }}
            {...cardContentProps}
          >
            <Link
              color="secondary"
              href={brandModule.getWebHref([brand])}
              variant="overline"
            >
              {brand?.title}
            </Link>
            <Link href={listingHref} variant={isSmall ? 'h5' : 'h4'}>
              {title}
            </Link>
            <Typography>{subtitle}</Typography>
            {is_listing_price_enabled && priceText && (
              <Typography variant="body2">{priceText}</Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Card>
  )
}

export default ListingListItem
