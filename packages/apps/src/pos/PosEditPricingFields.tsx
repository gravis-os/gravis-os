import React, { useState } from 'react'
import { Divider, IconButton, Stack, Typography } from '@gravis-os/ui'
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined'
import { getDiscountedPrice } from '../utils/getDiscountedPriceFromItem'
import PosAddStaffDialog, { PosAddStaffDialogProps } from './PosAddStaffDialog'
import PosApplyDiscountDialog from './PosApplyDiscountDialog'
import { usePos } from './PosProvider'
import posConfig from './posConfig'
import { CartItem } from './types'

export interface PosEditPricingFieldsProps {
  cartIndex: number
  quantity: number
  addStaffProps?: PosAddStaffDialogProps
}

const PosEditPricingFields: React.FC<PosEditPricingFieldsProps> = (props) => {
  const { cartIndex, quantity, addStaffProps } = props
  const { cart } = usePos()
  const item = cart?.items?.[cartIndex] as CartItem
  const { price, discount, discountType } = item || {}

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
      key: 'price',
      label: 'Price',
      action: (
        <Typography variant="subtitle1" fontSize={18}>
          {`${posConfig.default_currency} 
          ${
            getDiscountedPrice(price, discount, discountType) * (quantity ?? 1)
          }`}
        </Typography>
      ),
    },
    {
      key: 'apply-discount',
      label: 'Apply Discount',
      action: (
        <IconButton onClick={handleOnClickApplyDiscount}>
          <KeyboardArrowRightOutlinedIcon sx={{ fontSize: 36 }} />
        </IconButton>
      ),
    },
    {
      key: 'add-staff',
      label: 'Add staff who sold item',
      action: (
        <IconButton onClick={handleOnClickAddStaff}>
          <KeyboardArrowRightOutlinedIcon sx={{ fontSize: 36 }} />
        </IconButton>
      ),
    },
  ]

  return (
    <>
      <Stack>
        <Typography
          variant="overline"
          fontSize={16}
          sx={{ color: 'text.secondary' }}
        >
          Pricing
        </Typography>
        <Stack spacing={2} mt={3}>
          {editPricingFields.map((field) => (
            <React.Fragment key={field.key}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h1" fontSize={18}>
                  {field.label}
                </Typography>
                {field?.action ? field?.action : null}
              </Stack>
              <Divider />
            </React.Fragment>
          ))}
        </Stack>
      </Stack>
      <PosApplyDiscountDialog
        open={isApplyDiscountDialogOpen}
        onClose={handleCloseApplyDiscountDialog}
        cartIndex={cartIndex}
      />
      <PosAddStaffDialog
        open={isAddStaffDialogOpen}
        onClose={handleCloseAddStaffDialog}
        cartIndex={cartIndex}
        {...addStaffProps}
      />
    </>
  )
}

export default PosEditPricingFields
