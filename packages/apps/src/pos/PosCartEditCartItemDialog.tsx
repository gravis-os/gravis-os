import type { TransitionProps } from '@mui/material/transitions'

import React, { useEffect, useState } from 'react'

import { UseListReturn } from '@gravis-os/query'
import { StorageAvatar } from '@gravis-os/storage'
import {
  Button,
  Dialog,
  DialogTitle,
  Divider,
  ListItem,
  Stack,
} from '@gravis-os/ui'
import { DialogActions, DialogContent, Slide } from '@mui/material'
import set from 'lodash/set'

import PosEditPricingFields from './PosEditPricingFields'
import { usePos } from './PosProvider'
import QuantityButtonGroup from './QuantityButtonGroup'

export interface PosCartEditCartItemDialogProps {
  cartIndex: number
  onClose: VoidFunction
  open: boolean
  productSpecImagesQueryResult?: UseListReturn
}

const PosCartEditCartItemDialog: React.FC<PosCartEditCartItemDialogProps> = (
  props
) => {
  const { cartIndex, onClose, open, productSpecImagesQueryResult, ...rest } =
    props
  const { cart, removeFromCart, setCart } = usePos()

  const handleOnClickRemove = () => {
    onClose()
    removeFromCart(cartIndex)
  }
  const item = cart?.items?.[cartIndex]
  const { id: product_id } = item || {}

  const { items: productSpecImages } =
    (productSpecImagesQueryResult as any) || {}

  const productSpecImage =
    productSpecImages?.filter(
      ({ product_id: image_product_id }) => image_product_id === product_id
    ) || {}

  const { alt, src } = (productSpecImage?.[0] as any) || {}

  const [quantity, setQuantity] = useState(item?.quantity || 1)

  useEffect(() => {
    setQuantity(item?.quantity || 1)
  }, [cartIndex, item?.quantity])

  const handleClose = () => {
    if (quantity === 0) {
      removeFromCart(cartIndex)
    } else {
      setCart({
        ...cart,
        items: set(cart.items, `[${cartIndex}].quantity`, quantity),
      })
    }
    onClose()
  }

  const listItemProps = {
    title: item?.title,
    avatar: (
      <StorageAvatar alt={alt} size={90} src={src} sx={{ borderRadius: 0 }} />
    ),
    spacing: 2,
    subtitle: item?.subtitle,
  }

  return (
    <Dialog
      TransitionComponent={Slide}
      TransitionProps={{ direction: 'up' } as TransitionProps}
      fullScreen
      onClose={handleClose}
      open={open}
    >
      <DialogTitle>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
        >
          Edit Item
        </Stack>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ pt: 2 }}>
        <Stack spacing={3}>
          <ListItem
            {...listItemProps}
            subtitleProps={{
              variant: 'body1',
            }}
            sx={{
              px: 0,
            }}
            titleProps={{
              variant: 'h1',
            }}
          />

          <QuantityButtonGroup quantity={quantity} setQuantity={setQuantity} />
          <PosEditPricingFields
            cartIndex={cartIndex}
            quantity={quantity}
            {...rest}
          />
        </Stack>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button color="inherit" variant="outlined">
          View product detail
        </Button>
        <Button color="error" onClick={handleOnClickRemove} variant="contained">
          Remove from cart
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PosCartEditCartItemDialog
