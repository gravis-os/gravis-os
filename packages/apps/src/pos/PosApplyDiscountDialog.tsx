import React, { useState } from 'react'
import { Button, Dialog, DialogTitle, Divider, Typography } from '@gravis-os/ui'
import { printAmount } from '@gravis-os/utils'
import {
  DialogActions,
  DialogContent,
  Slide,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { Stack } from '@mui/system'
import set from 'lodash/set'
import startCase from 'lodash/startCase'
import { getDiscountedPrice } from '../utils/getDiscountedPriceFromItem'
import { usePos } from './PosProvider'

export interface PosApplyDiscountDialogProps {
  open: boolean
  onClose: () => void
  cartIndex: number
}

const PosApplyDiscountDialog: React.FC<PosApplyDiscountDialogProps> = (
  props
) => {
  const { open, onClose, cartIndex } = props
  const { cart, setCart } = usePos()
  const item = cart?.items?.[cartIndex]

  const [selectedDiscountType, setSelectedDiscountType] = useState(
    item?.discountType || 'amount'
  )
  const [nextCartItem, setNextCartItem] = useState(item)
  const handleSelectDiscountType = (e, newDiscountType: string) => {
    setSelectedDiscountType(newDiscountType)
    setNextCartItem({
      ...item,
      discountType: newDiscountType,
    })
  }
  const handleChangeItemDiscount = (value) => {
    setNextCartItem({
      ...item,
      discount: value,
      discountType: selectedDiscountType,
    })
  }

  const handleSaveDiscount = () => {
    setCart({
      ...cart,
      items: set(cart.items, `[${cartIndex}]`, nextCartItem),
    })
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
      TransitionComponent={Slide}
      TransitionProps={{ direction: 'left' } as TransitionProps}
    >
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          Apply Discount to Item
        </Stack>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ pt: 2 }}>
        <Stack spacing={3}>
          <Typography
            variant="overline"
            fontSize={16}
            sx={{ color: 'text.secondary' }}
          >
            Discount
          </Typography>
          <ToggleButtonGroup
            fullWidth
            exclusive
            value={selectedDiscountType}
            onChange={handleSelectDiscountType}
            color="primary"
          >
            <ToggleButton value="amount">Amount ($)</ToggleButton>
            <ToggleButton value="percentage">Percentage (%)</ToggleButton>
            <ToggleButton value="override">Price Override</ToggleButton>
          </ToggleButtonGroup>
          <TextField
            fullWidth
            label={startCase(selectedDiscountType)}
            value={nextCartItem?.discount}
            onChange={(e) => handleChangeItemDiscount(e.target.value)}
          />
          <TextField
            fullWidth
            label="Price"
            value={printAmount(
              getDiscountedPrice(
                item.price,
                nextCartItem?.discount,
                selectedDiscountType
              ) || item.price
            )}
          />
        </Stack>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button variant="contained" onClick={handleSaveDiscount}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PosApplyDiscountDialog
