import React from 'react'
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined'
import { ListItem, ListItemProps, Typography, withStates } from '@gravis-os/ui'
import { printAmount } from '@gravis-os/utils'
import { StorageImage } from '@gravis-os/storage'
import { CartItem } from './types'

export interface PosProductListItemProps extends ListItemProps {
  item: CartItem
  itemProps?: ListItemProps
}

const PosProductListItem: React.FC<PosProductListItemProps> = (props) => {
  const { item, itemProps, ...rest } = props

  const listItemProps = {
    avatar: <StorageImage src={item.avatar_src} alt={item.avatar_alt} />,
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
      <Typography variant="subtitle1">{printAmount(item.price)}</Typography>
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
