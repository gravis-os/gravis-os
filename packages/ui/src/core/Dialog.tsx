import React from 'react'
import {
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'
import Fade from '@mui/material/Fade'
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

const FadeTransition = React.forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement<any, any>
    },
    ref: React.Ref<unknown>
  ) => {
    return <Fade ref={ref} {...props} />
  }
)

export enum DialogTransitionVariantEnum {
  SLIDE = 'slide',
  FADE = 'fade',
}

export interface DialogProps extends MuiDialogProps {
  title?: string
  titleProps?: DialogTitleProps
  disableTransition?: boolean
  transitionVariant?: DialogTransitionVariantEnum | string
  disableTitle?: boolean
}

const getTransitionComponentByTransitionVariant = (
  transitionVariant: DialogProps['transitionVariant']
) => {
  switch (transitionVariant) {
    case DialogTransitionVariantEnum.FADE:
      return FadeTransition
    case DialogTransitionVariantEnum.SLIDE:
    default:
      return SlideTransition
  }
}

const Dialog: React.FC<DialogProps> = (props) => {
  const {
    transitionVariant,
    disableTransition,
    disableTitle,
    title,
    titleProps,
    children,
    ...rest
  } = props
  const { onClose } = rest

  const dialogProps = {
    fullWidth: true,
    ...(!disableTransition && {
      TransitionComponent:
        getTransitionComponentByTransitionVariant(transitionVariant),
    }),
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
      {!disableTitle && <DialogTitle {...titleProps}>{title}</DialogTitle>}
      {children}
    </MuiDialog>
  )
}

export default Dialog
