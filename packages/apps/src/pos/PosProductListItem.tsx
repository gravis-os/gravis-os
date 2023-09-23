import React from 'react'

import { UseListReturn } from '@gravis-os/query'
import { StorageAvatar } from '@gravis-os/storage'
import {
  Badge,
  ListItem,
  ListItemProps,
  Stack,
  Typography,
  withStates,
} from '@gravis-os/ui'
import { printAmount } from '@gravis-os/utils'
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined'

import getDiscountedPriceFromItem, {
  getDiscountAmount,
} from '../utils/getDiscountedPriceFromItem'
import { CartItem } from './types'

export interface PosProductListItemProps extends ListItemProps {
  item: CartItem
  itemProps?: ListItemProps
  productSpecImagesQueryResult?: UseListReturn
}

const PosProductListItem: React.FC<PosProductListItemProps> = (props) => {
  const { item, itemProps, productSpecImagesQueryResult, ...rest } = props
  const { id: product_id, discount, discountType, price, quantity } = item || {}

  const { items: productSpecImages } = productSpecImagesQueryResult || {}

  const productSpecImage =
    productSpecImages?.filter(
      ({ product_id: image_product_id }: { product_id: any }) =>
        image_product_id === product_id
    ) || {}

  const { alt, src } = productSpecImage?.[0] || {}

  const listItemProps = {
    title: (
      <Typography gutterBottom variant="h5">
        {item.title}
      </Typography>
    ),
    avatar: (
      <Badge
        badgeContent={quantity}
        color="secondary"
        invisible={quantity <= 1}
      >
        <StorageAvatar alt={alt} src={src} sx={{ borderRadius: 0 }} />
      </Badge>
    ),
    endIcon: (
      <KeyboardArrowRightOutlinedIcon sx={{ color: 'text.secondary' }} />
    ),
    right: (
      <Stack>
        {discount && discountType && (
          <>
            <Typography color="red" variant="subtitle2">
              {printAmount(price * quantity)}
            </Typography>
            <Typography color="red" variant="subtitle2">
              {getDiscountAmount(item)}
            </Typography>
          </>
        )}
        <Typography variant="subtitle1">
          {printAmount(getDiscountedPriceFromItem(item))}
        </Typography>
      </Stack>
    ),
    subtitle: (
      <Typography color="text.secondary" variant="body1">
        {item.brand.title}
      </Typography>
    ),
    ...rest,
    ...itemProps,
  }

  return <ListItem {...listItemProps} />
}

export default withStates()(PosProductListItem)
