import React from 'react'
import {
  DialogTitle as MuiDialogTitle,
  DialogTitleProps as MuiDialogTitleProps,
} from '@mui/material'
import { DialogProps as MuiDialogProps } from '@mui/material/Dialog/Dialog'

export interface DialogTitleProps extends MuiDialogTitleProps {}

const DialogTitle: React.FC<DialogTitleProps> = (props) => {
  const { children, sx, ...rest } = props
  return (
    <MuiDialogTitle sx={{ m: 0, p: 2, ...sx }} variant="h5" {...rest}>
      {children}
    </MuiDialogTitle>
  )
}

export default DialogTitle
