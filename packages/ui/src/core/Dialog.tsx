import React from 'react'
import {
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
  useMediaQuery,
  useTheme,
  SlideProps,
  FadeProps,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import dynamic from 'next/dynamic'
import type { TransitionProps } from '@mui/material/transitions'
import DialogTitle, { DialogTitleProps } from './DialogTitle'
import IconButton from './IconButton'

const DynamicFade = dynamic(() =>
  import('@mui/material').then((module) => module.Fade)
)

const DynamicSlide = dynamic(() =>
  import('@mui/material').then((module) => module.Slide)
)

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
    return <DynamicSlide {...slideProps} />
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
    return <DynamicFade {...fadeProps} />
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
  fullScreenOnMobile?: boolean
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
    fullScreenOnMobile,
    ...rest
  } = props
  const { onClose } = rest

  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  const dialogProps = {
    fullWidth: true,
    fullScreen: fullScreenOnMobile && !isDesktop,
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
