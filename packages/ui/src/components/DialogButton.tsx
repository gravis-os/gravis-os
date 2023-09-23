import React from 'react'

import Button, { ButtonProps } from '../core/Button'
import Dialog, { DialogProps } from '../core/Dialog'
import useOpen from '../hooks/useOpen'

export interface DialogButtonProps extends Omit<ButtonProps, 'title'> {
  children?: React.ReactNode
  dialogProps?: Omit<DialogProps, 'open'>
  dialogTitle?: DialogProps['title']
  onClose?: () => void
  open?: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  title?: ButtonProps['children']
}

// TODO@Joel: Test dynamic import of dialog for better perf
const DialogButton: React.FC<DialogButtonProps> = (props) => {
  const {
    title,
    children,
    dialogProps: injectedDialogProps,
    dialogTitle,
    onClose: injectedOnClose,
    open: injectedOpen = false,
    setOpen: injectedSetOpen,
    ...rest
  } = props

  // State
  const [isOpen, { close, open }] = useOpen(injectedOpen, injectedSetOpen)

  const dialogProps = {
    ...(dialogTitle && { title: dialogTitle }),
    ...injectedDialogProps,
  }

  return (
    <>
      <Button onClick={open} {...rest}>
        {title}
      </Button>

      <Dialog
        onClose={() => {
          close()
          injectedOnClose?.()
        }}
        open={injectedOpen || isOpen}
        {...dialogProps}
      >
        {children}
      </Dialog>
    </>
  )
}

export default DialogButton
