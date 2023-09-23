import React, { useState } from 'react'
import toast from 'react-hot-toast'

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

import Button, { ButtonProps } from './Button'
import Dialog, { DialogProps } from './Dialog'
import IconButton from './IconButton'

export interface ConfirmationDialogProps extends Omit<DialogProps, 'open'> {
  buttonComponent?: React.ElementType
  buttonProps?: ButtonProps
  disableToastSuccess?: boolean
  icon?: React.ReactElement
  onConfirm: () => Promise<void> | void
  tooltip?: string
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = (props) => {
  const {
    buttonComponent: ButtonComponent,
    buttonProps,
    disableToastSuccess,
    icon,
    onConfirm,
    tooltip = 'Delete',
    ...rest
  } = props

  // State
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false)
  const openDialog = () => setConfirmationDialogOpen(true)
  const closeDialog = () => setConfirmationDialogOpen(false)
  const handleConfirmButtonClick = async () => {
    try {
      if (onConfirm) await onConfirm()

      if (!disableToastSuccess) {
        toast.success('Success')
      }
    } catch (error) {
      toast.error('Error')
      console.error('Error caught:', error)
    } finally {
      closeDialog()
    }
  }

  const defaultButtonProps = {
    onClick: openDialog,
    tooltip,
  }

  return (
    <>
      {ButtonComponent ? (
        <ButtonComponent {...defaultButtonProps} {...buttonProps} />
      ) : (
        <IconButton
          size="small"
          {...defaultButtonProps}
          {...buttonProps}
          sx={{ '&:hover': { color: 'error.main' }, ...buttonProps?.sx }}
        >
          {icon || <DeleteOutlineOutlinedIcon fontSize="small" />}
        </IconButton>
      )}

      {/* Dialog */}
      <Dialog onClose={closeDialog} open={confirmationDialogOpen} {...rest}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to perform this action?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button autoFocus onClick={handleConfirmButtonClick}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ConfirmationDialog
