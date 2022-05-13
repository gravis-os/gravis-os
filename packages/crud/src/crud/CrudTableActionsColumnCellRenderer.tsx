import React, { useState } from 'react'
import {
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@mui/material'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined'
import { useQueryClient } from 'react-query'
import { Stack, Dialog, Button, IconButton } from '@gravis-os/ui'
import toast from 'react-hot-toast'
import getCrudItemHref from './getCrudItemHref'
import { CrudItem, CrudModule } from './typings'

export interface CrudTableActionsColumnCellRendererProps {
  module: CrudModule
  data: CrudItem
  disableManage?: boolean
  disableDelete?: boolean
}

const CrudTableActionsColumnCellRenderer: React.FC<
  CrudTableActionsColumnCellRendererProps
> = props => {
  const { module, data, disableDelete, disableManage } = props
  const { table } = module

  // Query
  const queryClient = useQueryClient()

  // Delete Dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const handleDeleteDialogOpen = () => setDeleteDialogOpen(true)
  const handleDeleteDialogClose = () => setDeleteDialogOpen(false)
  const handleDeleteClick = () => handleDeleteDialogOpen()
  const handleDeleteConfirmClick = async () => {
    try {
      await supabaseClient.from(table.name).delete().match({ id: data.id })
      queryClient.invalidateQueries(table.name)
      toast.success('Success')
    } catch (err) {
      toast.error('Error')
      console.error('Error caught:', err)
    }
  }

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="flex-start"
      spacing={1}
      sx={{ pr: 2 }}
    >
      {/* Manage */}
      {!disableManage && (
        <IconButton
          size="small"
          href={getCrudItemHref({ module, item: data })}
          sx={{ '&:hover': { color: 'primary.main' } }}
          tooltip="Manage"
        >
          <ArrowCircleRightOutlinedIcon fontSize="small" />
        </IconButton>
      )}

      {/* Delete */}
      {!disableDelete && (
        <>
          <IconButton
            size="small"
            onClick={handleDeleteClick}
            sx={{ '&:hover': { color: 'error.main' } }}
            tooltip="Delete"
          >
            <DeleteOutlineOutlinedIcon fontSize="small" />
          </IconButton>

          {/* Delete Dialog */}
          <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
            <DialogTitle>Delete Confirmation</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this item?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteDialogClose}>Cancel</Button>
              <Button onClick={handleDeleteConfirmClick} autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Stack>
  )
}

export default CrudTableActionsColumnCellRenderer
