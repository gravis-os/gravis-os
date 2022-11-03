import React from 'react'
import {
  DialogTitle as MuiDialogTitle,
  DialogTitleProps as MuiDialogTitleProps,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { DialogProps as MuiDialogProps } from '@mui/material/Dialog/Dialog'
import IconButton from './IconButton'

export interface DialogTitleProps extends MuiDialogTitleProps {
  onClose?: MuiDialogProps['onClose']
}

const DialogTitle: React.FC<DialogTitleProps> = (props) => {
  const { children, onClose, sx, ...rest } = props
  return (
    <>
      <MuiDialogTitle sx={{ m: 0, p: 2, ...sx }} variant="h5" {...rest}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={(e) => onClose(e, 'backdropClick')}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    </>
  )
}

export default DialogTitle
