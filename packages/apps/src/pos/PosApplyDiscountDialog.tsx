import React, { useState } from 'react'

import {
  Button,
  Dialog,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from '@gravis-os/ui'
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
import set from 'lodash/set'
import startCase from 'lodash/startCase'

import type { CartItem } from './types'

import { getDiscountedPrice } from '../utils/getDiscountedPriceFromItem'
import { usePos } from './PosProvider'

export interface PosApplyDiscountDialogProps {
  cartIndex: number
  onClose: VoidFunction
  open: boolean
}

const PosApplyDiscountDialog: React.FC<PosApplyDiscountDialogProps> = (
  props
) => {
  const { cartIndex, onClose, open } = props
  const { cart, setCart } = usePos()
  const item = cart?.items?.[cartIndex] ?? ({} as CartItem)

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
      TransitionComponent={Slide}
      TransitionProps={{ direction: 'left' } as TransitionProps}
      fullScreen
      onClose={onClose}
      open={open}
    >
      <DialogTitle>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
        >
          Apply Discount to Item
        </Stack>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ pt: 2 }}>
        <Stack spacing={3}>
          <Typography
            fontSize={16}
            sx={{ color: 'text.secondary' }}
            variant="overline"
          >
            Discount
          </Typography>
          <ToggleButtonGroup
            color="primary"
            exclusive
            fullWidth
            onChange={handleSelectDiscountType}
            value={selectedDiscountType}
          >
            <ToggleButton value="amount">Amount ($)</ToggleButton>
            <ToggleButton value="percentage">Percentage (%)</ToggleButton>
            <ToggleButton value="override">Price Override</ToggleButton>
          </ToggleButtonGroup>
          <TextField
            fullWidth
            label={startCase(selectedDiscountType)}
            onChange={(e) => handleChangeItemDiscount(e.target.value)}
            value={nextCartItem?.discount}
          />
          <TextField
            fullWidth
            label="Price"
            value={printAmount(
              getDiscountedPrice(
                item?.price,
                nextCartItem?.discount,
                selectedDiscountType
              ) || item?.price
            )}
          />
        </Stack>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={handleSaveDiscount} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PosApplyDiscountDialog
