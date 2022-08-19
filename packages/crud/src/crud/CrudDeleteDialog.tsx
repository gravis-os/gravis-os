import React from 'react'
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { Button, Dialog, DialogProps } from '@gravis-os/ui'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import toast from 'react-hot-toast'
import { CrudItem, CrudModule } from '@gravis-os/types'
import { useQueryClient } from 'react-query'
import useCrud from './useCrud'

export interface CrudDeleteDialogProps
  extends Omit<DialogProps, 'open' | 'onClose'> {
  module: CrudModule
  items?: CrudItem[]

  // Dialog
  open?: DialogProps['open']
  onClose?: DialogProps['onClose']

  // Methods
  afterDelete?: ({ item }: { item: CrudItem }) => Promise<unknown>
  onCancel?: (e: React.SyntheticEvent) => void
}

const CrudDeleteDialog: React.FC<CrudDeleteDialogProps> = (props) => {
  const {
    // TODO@Joel: How to tell if i'm doing a single or bulk delete via items?
    items: injectedItems,
    module,
    open: injectedOpen,
    onClose: injectedOnClose,
    onCancel: injectedOnCancel,
    afterDelete,
  } = props

  // State
  const {
    hasMultipleSelectedItems,
    selectedItems,
    handleDeleteDialogClose,
    deleteDialogOpen,
  } = useCrud()
  const open = injectedOpen || deleteDialogOpen
  const onClose = injectedOnClose || handleDeleteDialogClose
  const onCancel = injectedOnCancel || handleDeleteDialogClose
  const items = injectedItems || selectedItems

  // Booleans
  const isBulkDelete = hasMultipleSelectedItems
  const item = !hasMultipleSelectedItems && selectedItems[0]

  // Methods
  const { table, sk = 'id' } = module
  const queryClient = useQueryClient()
  const handleDeleteConfirmClick = async (e) => {
    try {
      const defaultQuery = supabaseClient.from(table.name).delete()
      const onDelete = await (isBulkDelete
        ? defaultQuery.in(
            sk,
            items.map((item) => item[sk])
          )
        : defaultQuery.match({ [sk]: item[sk] }))

      queryClient.invalidateQueries(table.name)
      if (afterDelete) await afterDelete({ item })
      onCancel(e)
      toast.success('Success')
    } catch (err) {
      toast.error('Error')
      console.error('Error caught:', err)
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {isBulkDelete ? 'Bulk Delete' : 'Delete'} Confirmation
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete{' '}
          {isBulkDelete ? `these ${items.length} items` : 'this item'}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={handleDeleteConfirmClick} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CrudDeleteDialog
