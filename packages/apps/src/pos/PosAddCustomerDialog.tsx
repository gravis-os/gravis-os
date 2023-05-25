import React, { useState } from 'react'
import { ModelField } from '@gravis-os/form'
import { CrudModule } from '@gravis-os/types'
import { Button, Dialog, DialogTitle, Divider } from '@gravis-os/ui'
import { DialogActions, DialogContent, Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { Stack } from '@mui/system'
import noop from 'lodash/noop'
import { usePos } from './PosProvider'
import { Customer } from './types'

export interface PosAddCustomerDialogProps {
  open: boolean
  onClose: () => void
  customerModule?: CrudModule
  addCustomerFields?: React.ReactNode
}

const PosAddCustomerDialog: React.FC<PosAddCustomerDialogProps> = (props) => {
  const {
    open,
    onClose,
    customerModule: injectedCustomerModule,
    addCustomerFields: injectedAddCustomerFields,
    ...rest
  } = props || {}
  const { cart, setCart } = usePos()

  const [customer, setCustomer] = useState<Customer | null>(
    cart?.customer ?? null
  )

  const customerModule = injectedCustomerModule

  const addCustomerFieldsJsx = injectedAddCustomerFields || (
    <ModelField
      module={customerModule}
      name="contact_id"
      setValue={noop}
      onChange={setCustomer}
      value={customer}
      label="Contact"
      optionLabelKey="full_name"
      select={customerModule.select.detail}
      {...rest}
    />
  )

  const handleOnSaveCustomer = () => {
    setCart({
      ...cart,
      customer,
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
          Add Customer
        </Stack>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ pt: 2 }}>
        <Stack spacing={3}>{addCustomerFieldsJsx}</Stack>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button variant="contained" onClick={handleOnSaveCustomer}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PosAddCustomerDialog
