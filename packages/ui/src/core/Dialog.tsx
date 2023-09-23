import type { TransitionProps } from '@mui/material/transitions'

import React from 'react'

import CloseIcon from '@mui/icons-material/Close'
import {
  Fade,
  FadeProps,
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
  Slide,
  SlideProps,
  useMediaQuery,
  useTheme,
} from '@mui/material'

import DialogTitle, { DialogTitleProps } from './DialogTitle'
import IconButton from './IconButton'

const SlideTransition = React.forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement<any, any>
    },
    ref: React.Ref<unknown>
  ) => {
    const slideProps = {
      direction: 'up',
      ref,
      ...props,
    } as SlideProps
    return <Slide {...slideProps} />
  }
)

const FadeTransition = React.forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement<any, any>
    },
    ref: React.Ref<unknown>
  ) => {
    const fadeProps = {
      ref,
      ...props,
    } as FadeProps
    return <Fade {...fadeProps} />
  }
)

export enum DialogTransitionVariantEnum {
  FADE = 'fade',
  SLIDE = 'slide',
}

export interface DialogProps extends MuiDialogProps {
  disableTitle?: boolean
  disableTransition?: boolean
  fullScreenOnMobile?: boolean
  title?: string
  titleProps?: DialogTitleProps
  transitionVariant?: DialogTransitionVariantEnum | string
}

const getTransitionComponentByTransitionVariant = (
  transitionVariant: DialogProps['transitionVariant']
) => {
  switch (transitionVariant) {
    case DialogTransitionVariantEnum.FADE: {
      return FadeTransition
    }
    case DialogTransitionVariantEnum.SLIDE:
    default: {
      return SlideTransition
    }
  }
}

const Dialog: React.FC<DialogProps> = (props) => {
  const {
    title,
    children,
    disableTitle,
    disableTransition,
    fullScreenOnMobile,
    titleProps,
    transitionVariant,
    ...rest
  } = props
  const { onClose } = rest

  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  const dialogProps = {
    fullScreen: fullScreenOnMobile && !isDesktop,
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
            color: (theme) => theme.palette.grey[500],
            position: 'absolute',
            right: 8,
            top: 8,
            zIndex: 1,
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
