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
import type { TransitionProps } from '@mui/material/transitions'
import set from 'lodash/set'
import PosEditPricingFields from './PosEditPricingFields'
import { usePos } from './PosProvider'
import QuantityButtonGroup from './QuantityButtonGroup'

export interface PosCartEditCartItemDialogProps {
  open: boolean
  onClose: VoidFunction
  cartIndex: number
  productSpecImagesQueryResult?: UseListReturn
}

const PosCartEditCartItemDialog: React.FC<PosCartEditCartItemDialogProps> = (
  props
) => {
  const { open, onClose, cartIndex, productSpecImagesQueryResult, ...rest } =
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

  const { src, alt } = (productSpecImage?.[0] as any) || {}

  const [quantity, setQuantity] = useState(item?.quantity || 1)

  useEffect(() => {
    setQuantity(item?.quantity || 1)
  }, [cartIndex])

  const handleClose = () => {
    if (quantity === 0) {
      removeFromCart(cartIndex)
    } else {
      setCart({
        ...cart,
        items: set(cart.items, `[${cartIndex}].quantity`, quantity),
      })
    }
    setQuantity(1)
    onClose()
  }

  const listItemProps = {
    title: item?.title,
    subtitle: item?.subtitle,
    avatar: (
      <StorageAvatar size={90} src={src} alt={alt} sx={{ borderRadius: 0 }} />
    ),
    spacing: 2,
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen
      TransitionComponent={Slide}
      TransitionProps={{ direction: 'up' } as TransitionProps}
    >
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          Edit Item
        </Stack>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ pt: 2 }}>
        <Stack spacing={3}>
          <ListItem
            {...listItemProps}
            titleProps={{
              variant: 'h1',
            }}
            subtitleProps={{
              variant: 'body1',
            }}
            sx={{
              px: 0,
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
        <Button color="error" variant="contained" onClick={handleOnClickRemove}>
          Remove from cart
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PosCartEditCartItemDialog
