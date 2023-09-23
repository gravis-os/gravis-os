import React, { useState } from 'react'

import { ModelField } from '@gravis-os/form'
import { UseListProps } from '@gravis-os/query'
import { CrudModule } from '@gravis-os/types'
import { Button, Dialog, DialogTitle, Divider, Stack } from '@gravis-os/ui'
import { DialogActions, DialogContent, Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import noop from 'lodash/noop'
import omit from 'lodash/omit'
import set from 'lodash/set'

import { usePos } from './PosProvider'
import { Salesperson } from './types'

export interface PosAddStaffDialogProps {
  cartIndex: number
  onClose: VoidFunction
  open: boolean
  salespersonModule?: CrudModule
  setQuery?: UseListProps['setQuery']
}

const PosAddStaffDialog: React.FC<PosAddStaffDialogProps> = (props) => {
  const {
    cartIndex,
    onClose,
    open,
    salespersonModule: injectedSalespersonModule,
    setQuery: injectedSetQuery,
  } = props
  const { cart, setCart } = usePos()
  const item = cart?.items?.[cartIndex]

  const [salesperson, setSalesperson] = useState<Salesperson | null>(
    item?.staff ?? null
  )
  const salespersonModule = injectedSalespersonModule
  const getSalespersons = async ({ select }) =>
    injectedSetQuery
      ? injectedSetQuery({ select })
      : supabaseClient
          .from(salespersonModule.table.name)
          .select(select)
          .match({ 'role.type': 'salesperson' })

  const handleOnChangeSalesperson = (value) => {
    setSalesperson(value)
  }

  const handleOnSaveAddStaff = () => {
    setCart({
      ...cart,
      items: set(cart.items, `[${cartIndex}].staff`, omit(salesperson, 'role')),
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
          Add Salesperson
        </Stack>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ pt: 2 }}>
        <Stack spacing={3}>
          <ModelField
            label="Salesperson"
            module={salespersonModule}
            name="user_id"
            onChange={handleOnChangeSalesperson}
            optionLabelKey="full_name"
            renderOption={({ option }) => (
              <>{option.full_name ?? option.title}</>
            )}
            select="id, title, full_name, role!inner(*)"
            setQuery={getSalespersons}
            setValue={noop}
            value={salesperson?.full_name}
          />
        </Stack>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={handleOnSaveAddStaff} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PosAddStaffDialog
