import React from 'react'
import toast from 'react-hot-toast'
import { useQueryClient } from 'react-query'

import { CrudItem, CrudModule } from '@gravis-os/types'
import { Button, Dialog, DialogProps, Typography } from '@gravis-os/ui'
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import useCrud from './useCrud'

const supabase = createClientComponentClient()

export interface CrudDeleteDialogProps
  extends Omit<DialogProps, 'onClose' | 'open'> {
  // Methods
  afterDelete?: ({ item }: { item: CrudItem }) => Promise<unknown>
  items?: CrudItem[]

  module: CrudModule
  onCancel?: (e: React.SyntheticEvent) => void

  onClose?: DialogProps['onClose']
  // Dialog
  open?: DialogProps['open']
}

const CrudDeleteDialog: React.FC<CrudDeleteDialogProps> = (props) => {
  const {
    afterDelete,
    items: injectedItems,
    module,
    onCancel: injectedOnCancel,
    onClose: injectedOnClose,
    open: injectedOpen,
  } = props

  // State
  const {
    deleteDialogOpen,
    handleDeleteDialogClose,
    hasMultipleSelectedItems,
    selectedItems,
  } = useCrud()

  const open = injectedOpen || deleteDialogOpen
  const onClose = injectedOnClose || handleDeleteDialogClose
  const onCancel = injectedOnCancel || handleDeleteDialogClose
  const items = injectedItems || selectedItems

  // Booleans
  const isBulkDelete = hasMultipleSelectedItems
  const item = !hasMultipleSelectedItems && selectedItems[0]

  // Methods
  const { sk = 'id', table } = module
  const queryClient = useQueryClient()
  const handleDeleteConfirmClick = async (e) => {
    try {
      const defaultQuery = supabase.from(table.name).delete()
      const onDelete = await (isBulkDelete
        ? defaultQuery
            .in(
              sk,
              items.map((item) => item[sk])
            )
            .select()
        : defaultQuery.match({ [sk]: item[sk] })
      ).select()

      queryClient.invalidateQueries([table.name])
      if (afterDelete) await afterDelete({ item })
      onCancel(e)
      toast.success('Success')
    } catch (error) {
      toast.error('Error')
      console.error('Error caught:', error)
    }
  }

  return (
    <Dialog maxWidth="xs" onClose={onClose} open={open}>
      <DialogTitle>
        <Typography variant="h3">
          {isBulkDelete ? 'Bulk Delete' : 'Delete'} Confirmation
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete{' '}
          {isBulkDelete ? `these ${items.length} items` : 'this item'}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          autoFocus
          color="error"
          onClick={handleDeleteConfirmClick}
          variant="contained"
        >
          Confirm Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CrudDeleteDialog
