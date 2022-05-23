import React, { useState } from 'react'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import toast from 'react-hot-toast'
import Button, { ButtonProps } from './Button'
import Dialog, { DialogProps } from './Dialog'
import IconButton from './IconButton'

export interface ConfirmationDialogProps extends Omit<DialogProps, 'open'> {
  onConfirm: () => Promise<void> | void
  icon?: React.ReactElement
  tooltip?: string
  buttonProps?: ButtonProps
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = (props) => {
  const { tooltip = 'Delete', icon, onConfirm, buttonProps, ...rest } = props

  // State
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false)
  const openDialog = () => setConfirmationDialogOpen(true)
  const closeDialog = () => setConfirmationDialogOpen(false)
  const handleConfirmButtonClick = async () => {
    try {
      if (onConfirm) await onConfirm()
      toast.success('Success')
    } catch (err) {
      toast.error('Error')
      console.error('Error caught:', err)
    } finally {
      closeDialog()
    }
  }

  return (
    <>
      <IconButton
        size="small"
        onClick={openDialog}
        sx={{ '&:hover': { color: 'error.main' } }}
        tooltip={tooltip}
        {...buttonProps}
      >
        {icon || <DeleteOutlineOutlinedIcon fontSize="small" />}
      </IconButton>

      {/* Dialog */}
      <Dialog open={confirmationDialogOpen} onClose={closeDialog} {...rest}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to perform this action?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={handleConfirmButtonClick} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ConfirmationDialog
