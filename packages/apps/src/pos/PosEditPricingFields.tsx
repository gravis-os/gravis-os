import React, { useState } from 'react'

import { Divider, IconButton, Stack, Typography } from '@gravis-os/ui'
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined'

import { getDiscountedPrice } from '../utils/getDiscountedPriceFromItem'
import PosAddStaffDialog, { PosAddStaffDialogProps } from './PosAddStaffDialog'
import PosApplyDiscountDialog from './PosApplyDiscountDialog'
import posConfig from './posConfig'
import { usePos } from './PosProvider'
import { CartItem } from './types'

export interface PosEditPricingFieldsProps {
  addStaffProps?: PosAddStaffDialogProps
  cartIndex: number
  quantity: number
}

const PosEditPricingFields: React.FC<PosEditPricingFieldsProps> = (props) => {
  const { addStaffProps, cartIndex, quantity } = props
  const { cart } = usePos()
  const item = cart?.items?.[cartIndex] as CartItem
  const { discount, discountType, price } = item || {}

  const [isApplyDiscountDialogOpen, setIsApplyDiscountDialogOpen] =
    useState(false)
  const [isAddStaffDialogOpen, setIsAddStaffDialogOpen] = useState(false)

  const handleOnClickApplyDiscount = () => setIsApplyDiscountDialogOpen(true)
  const handleCloseApplyDiscountDialog = () =>
    setIsApplyDiscountDialogOpen(false)

  const handleOnClickAddStaff = () => {
    setIsAddStaffDialogOpen(true)
  }
  const handleCloseAddStaffDialog = () => setIsAddStaffDialogOpen(false)

  const editPricingFields = [
    {
      action: (
        <Typography fontSize={18} variant="subtitle1">
          {`${posConfig.default_currency} 
          ${
            getDiscountedPrice(price, discount, discountType) * (quantity ?? 1)
          }`}
        </Typography>
      ),
      key: 'price',
      label: 'Price',
    },
    {
      action: (
        <IconButton onClick={handleOnClickApplyDiscount}>
          <KeyboardArrowRightOutlinedIcon sx={{ fontSize: 36 }} />
        </IconButton>
      ),
      key: 'apply-discount',
      label: 'Apply Discount',
    },
    {
      action: (
        <IconButton onClick={handleOnClickAddStaff}>
          <KeyboardArrowRightOutlinedIcon sx={{ fontSize: 36 }} />
        </IconButton>
      ),
      key: 'add-staff',
      label: 'Add staff who sold item',
    },
  ]

  return (
    <>
      <Stack>
        <Typography
          fontSize={16}
          sx={{ color: 'text.secondary' }}
          variant="overline"
        >
          Pricing
        </Typography>
        <Stack mt={3} spacing={2}>
          {editPricingFields.map((field) => (
            <React.Fragment key={field.key}>
              <Stack
                alignItems="center"
                direction="row"
                justifyContent="space-between"
              >
                <Typography fontSize={18} variant="h1">
                  {field.label}
                </Typography>
                {field?.action ?? null}
              </Stack>
              <Divider />
            </React.Fragment>
          ))}
        </Stack>
      </Stack>
      <PosApplyDiscountDialog
        cartIndex={cartIndex}
        onClose={handleCloseApplyDiscountDialog}
        open={isApplyDiscountDialogOpen}
      />
      <PosAddStaffDialog
        cartIndex={cartIndex}
        onClose={handleCloseAddStaffDialog}
        open={isAddStaffDialogOpen}
        {...addStaffProps}
      />
    </>
  )
}

export default PosEditPricingFields
