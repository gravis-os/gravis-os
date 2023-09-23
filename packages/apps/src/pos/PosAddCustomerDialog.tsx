import React, { useState } from 'react'

import { ModelField } from '@gravis-os/form'
import { CrudModule } from '@gravis-os/types'
import { Button, Dialog, DialogTitle, Divider, Stack } from '@gravis-os/ui'
import { DialogActions, DialogContent, Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import noop from 'lodash/noop'

import { usePos } from './PosProvider'
import { Customer } from './types'

export interface PosAddCustomerDialogProps {
  addCustomerFields?: React.ReactNode
  customerModule?: CrudModule
  onClose: VoidFunction
  open: boolean
}

const PosAddCustomerDialog: React.FC<PosAddCustomerDialogProps> = (props) => {
  const {
    addCustomerFields: injectedAddCustomerFields,
    customerModule: injectedCustomerModule,
    onClose,
    open,
    ...rest
  } = props || {}
  const { cart, setCart } = usePos()

  const [customer, setCustomer] = useState<Customer | null>(
    cart?.customer ?? null
  )

  const customerModule = injectedCustomerModule

  const addCustomerFieldsJsx = injectedAddCustomerFields || (
    <ModelField
      label="Contact"
      module={customerModule}
      name="contact_id"
      onChange={setCustomer}
      optionLabelKey="full_name"
      select={customerModule.select.detail}
      setValue={noop}
      value={customer}
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
          Add Customer
        </Stack>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ pt: 2 }}>
        <Stack spacing={3}>{addCustomerFieldsJsx}</Stack>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={handleOnSaveCustomer} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PosAddCustomerDialog
