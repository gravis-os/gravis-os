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
  Stack,
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
    attribute_value,
    avatar_alt,
    avatar_src,
    brand,
    directory_category,
    priceText,
    subtitle,
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
      <Grid alignItems="center" container>
        {is_listing_image_enabled && avatar_src && (
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
            p={4}
            stretch
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              ...cardContentProps?.sx,
            }}
            {...cardContentProps}
          >
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack>
                <Link
                  color="secondary"
                  href={brandModule.getWebHref([brand])}
                  variant="overline"
                >
                  {brand?.title}
                </Link>
                <Link href={listingHref} variant={isSmall ? 'h6' : 'h5'}>
                  {title}
                </Link>
                <Typography>{subtitle}</Typography>
                {is_listing_price_enabled && priceText && (
                  <Typography variant="body2">{priceText}</Typography>
                )}
              </Stack>
              {is_listing_brand_image_enabled && (
                <StorageImage height={50} src={brand?.avatar_src} width={50} />
              )}
            </Stack>
          </Box>
        </Grid>
        {attribute_value?.length > 0 && (
          <Grid item xs={12}>
            <Box
              p={4}
              stretch
              sx={{
                backgroundColor: 'background.muted',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                ...cardContentProps?.sx,
              }}
              {...cardContentProps}
            >
              <Grid container spacing={2}>
                {attribute_value
                  .slice(0, 4)
                  .map(({ attribute, attribute_option }) => (
                    <Grid item md={3} xs={6}>
                      <Stack>
                        <Typography variant="h6">
                          {attribute_option.title}
                        </Typography>
                        <Typography sx={{ opacity: 0.5 }}>
                          {attribute.title}
                        </Typography>
                      </Stack>
                    </Grid>
                  ))}
              </Grid>
            </Box>
          </Grid>
        )}
      </Grid>
    </Card>
  )
}

export default ListingListItem
