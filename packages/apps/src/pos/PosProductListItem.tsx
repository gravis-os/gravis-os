import React from 'react'
import { UseListReturn } from '@gravis-os/query'
import { StorageAvatar } from '@gravis-os/storage'
import {
  Badge,
  ListItem,
  ListItemProps,
  Typography,
  withStates,
} from '@gravis-os/ui'
import { printAmount } from '@gravis-os/utils'
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined'
import getDiscountedPriceFromItem from '../utils/getDiscountedPriceFromItem'
import { CartItem } from './types'

export interface PosProductListItemProps extends ListItemProps {
  item: CartItem
  itemProps?: ListItemProps
  productSpecImagesQueryResult?: UseListReturn
}

const PosProductListItem: React.FC<PosProductListItemProps> = (props) => {
  const { item, itemProps, productSpecImagesQueryResult, ...rest } = props
  const { id: product_id, quantity } = item || {}

  const { items: productSpecImages } =
    (productSpecImagesQueryResult as any) || {}

  const productSpecImage =
    productSpecImages?.filter(
      ({ product_id: image_product_id }) => image_product_id === product_id
    ) || {}

  const { src, alt } = (productSpecImage?.[0] as any) || {}

  const listItemProps = {
    avatar: (
      <Badge badgeContent={quantity} color="primary" invisible={quantity <= 1}>
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
      <Typography variant="subtitle1">
        {printAmount(getDiscountedPriceFromItem(item))}
      </Typography>
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
