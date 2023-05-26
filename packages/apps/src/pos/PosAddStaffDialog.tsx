import React, { useState } from 'react'
import { ModelField } from '@gravis-os/form'
import { UseListProps } from '@gravis-os/query'
import { CrudModule } from '@gravis-os/types'
import { Button, Dialog, DialogTitle, Divider } from '@gravis-os/ui'
import { DialogActions, DialogContent, Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { Stack } from '@mui/system'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import noop from 'lodash/noop'
import omit from 'lodash/omit'
import set from 'lodash/set'
import { usePos } from './PosProvider'
import { Salesperson } from './types'

export interface PosAddStaffDialogProps {
  open: boolean
  onClose: VoidFunction
  cartIndex: number
  salespersonModule?: CrudModule
  setQuery?: UseListProps['setQuery']
}

const PosAddStaffDialog: React.FC<PosAddStaffDialogProps> = (props) => {
  const {
    open,
    onClose,
    cartIndex,
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
          Add Salesperson
        </Stack>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ pt: 2 }}>
        <Stack spacing={3}>
          <ModelField
            module={salespersonModule}
            name="user_id"
            setValue={noop}
            onChange={handleOnChangeSalesperson}
            value={salesperson?.full_name}
            label="Salesperson"
            optionLabelKey="full_name"
            select="id, title, full_name, role!inner(*)"
            renderOption={({ option }) => (
              <>{option.full_name ?? option.title}</>
            )}
            setQuery={getSalespersons}
          />
        </Stack>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button variant="contained" onClick={handleOnSaveAddStaff}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PosAddStaffDialog
