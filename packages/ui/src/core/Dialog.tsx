import React from 'react'
import {
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import DialogTitle, { DialogTitleProps } from './DialogTitle'
import IconButton from './IconButton'

const SlideTransition = React.forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement<any, any>
    },
    ref: React.Ref<unknown>
  ) => {
    return <Slide direction="up" ref={ref} {...props} />
  }
)

export interface DialogProps extends MuiDialogProps {
  title?: string
  titleProps?: DialogTitleProps
  disableTransition?: boolean
}

const Dialog: React.FC<DialogProps> = (props) => {
  const { disableTransition, title, titleProps, children, ...rest } = props
  const { onClose } = rest

  const dialogProps = {
    fullWidth: true,
    ...(!disableTransition && { TransitionComponent: SlideTransition }),
    ...rest,
  }

  return (
    <MuiDialog {...dialogProps}>
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
      <DialogTitle {...titleProps}>{title}</DialogTitle>
      {children}
    </MuiDialog>
  )
}

export default Dialog
