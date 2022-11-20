import React from 'react'
import {
  Box,
  Card,
  CardProps,
  Link,
  Grid,
  Typography,
  BoxProps,
} from '@gravis-os/ui'
import { CrudModule } from '@gravis-os/types'
import { StorageImage } from '@gravis-os/storage'
import { Listing } from './types'

export interface ListingListItemProps extends CardProps {
  item: Listing
  brandModule: CrudModule | any
  listingModule: CrudModule | any
  size?: 'small' | 'medium' | 'large'
  cardContentProps?: BoxProps
}

const ListingListItem: React.FC<ListingListItemProps> = (props) => {
  const {
    item,
    size = 'medium',
    cardContentProps,
    brandModule,
    listingModule,
    sx,
    ...rest
  } = props

  if (!item) return null

  const isSmall = size === 'small'

  const { title, subtitle, avatar_src, avatar_alt, brand, directory_category } =
    item
  const { directory } = directory_category
  const { is_listing_image_enabled } = directory

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
      <Grid container spacing={2}>
        {is_listing_image_enabled && (
          <Grid item xs={3} lg={isSmall ? 3 : 2}>
            <Link href={listingHref}>
              <StorageImage
                src={avatar_src}
                alt={avatar_alt || title}
                scaleOnHover
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
              variant="overline"
              href={brandModule.getWebHref([brand])}
              color="secondary"
            >
              {brand?.title}
            </Link>
            <Link variant={isSmall ? 'h5' : 'h4'} href={listingHref}>
              {title}
            </Link>
            <Typography>{subtitle}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Card>
  )
}

export default ListingListItem
