import React from 'react'
import {
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
} from '@mui/material'

export interface DialogProps extends MuiDialogProps {}

const Dialog: React.FC<DialogProps> = props => {
  return <MuiDialog {...props} />
}

export default Dialog
