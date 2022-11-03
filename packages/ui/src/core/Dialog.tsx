import React from 'react'
import {
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
} from '@mui/material'
import DialogTitle from './DialogTitle'

export interface DialogProps extends MuiDialogProps {
  title?: string
}

const Dialog: React.FC<DialogProps> = (props) => {
  const { title, children, ...rest } = props
  const { onClose } = rest
  return (
    <MuiDialog {...rest}>
      {title && <DialogTitle onClose={onClose}>{title}</DialogTitle>}
      {children}
    </MuiDialog>
  )
}

export default Dialog
