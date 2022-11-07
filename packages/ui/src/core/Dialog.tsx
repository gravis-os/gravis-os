import React from 'react'
import {
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import DialogTitle from './DialogTitle'
import IconButton from './IconButton'

export interface DialogProps extends MuiDialogProps {
  title?: string
}

const Dialog: React.FC<DialogProps> = (props) => {
  const { title, children, ...rest } = props
  const { onClose } = rest
  return (
    <MuiDialog {...rest}>
      {onClose && (
        <IconButton
          aria-label="close"
          onClick={(e) => onClose(e, 'backdropClick')}
          sx={{
            position: 'absolute',
            zIndex: 1,
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
      {title && <DialogTitle onClose={onClose}>{title}</DialogTitle>}
      {children}
    </MuiDialog>
  )
}

export default Dialog
