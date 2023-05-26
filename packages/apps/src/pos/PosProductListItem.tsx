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
  const { id: product_id, quantity, price, discount, discountType } = item || {}

  const { items: productSpecImages } = productSpecImagesQueryResult || {}

  const productSpecImage =
    productSpecImages?.filter(
      ({ product_id: image_product_id }: { product_id: any }) =>
        image_product_id === product_id
    ) || {}

  const { src, alt } = productSpecImage?.[0] || {}

  const listItemProps = {
    avatar: (
      <Badge
        badgeContent={quantity}
        color="secondary"
        invisible={quantity <= 1}
      >
        <StorageAvatar src={src} alt={alt} sx={{ borderRadius: 0 }} />
      </Badge>
    ),
    title: (
      <Typography variant="h5" gutterBottom>
        {item.title}
      </Typography>
    ),
    subtitle: (
      <Typography variant="body1" color="text.secondary">
        {item.brand.title}
      </Typography>
    ),
    right: (
      <Stack>
        {discount && discountType && (
          <>
            <Typography variant="subtitle2" color="red">
              {printAmount(price * quantity)}
            </Typography>
            <Typography variant="subtitle2" color="red">
              {getDiscountAmount(item)}
            </Typography>
          </>
        )}
        <Typography variant="subtitle1">
          {printAmount(getDiscountedPriceFromItem(item))}
        </Typography>
      </Stack>
    ),
    endIcon: (
      <KeyboardArrowRightOutlinedIcon sx={{ color: 'text.secondary' }} />
    ),
    ...rest,
    ...itemProps,
  }

  return <ListItem {...listItemProps} />
}

export default withStates()(PosProductListItem)
