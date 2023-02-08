import React, { useEffect } from 'react'
import Button, { ButtonProps } from '../core/Button'
import Dialog, { DialogProps } from '../core/Dialog'
import useOpen from '../hooks/useOpen'

export interface DialogButtonProps extends Omit<ButtonProps, 'title'> {
  children?: React.ReactNode
  open?: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  title?: ButtonProps['children']
  dialogProps?: Omit<DialogProps, 'open'>
}

const DialogButton: React.FC<DialogButtonProps> = (props) => {
  const {
    children,
    title,
    open: injectedOpen = false,
    setOpen: injectedSetOpen,
    dialogProps,
    ...rest
  } = props

  // State
  const [isOpen, { open, close }] = useOpen(injectedOpen, injectedSetOpen)

  return (
    <>
      <Button onClick={open} {...rest}>
        {title}
      </Button>

      <Dialog open={injectedOpen || isOpen} onClose={close} {...dialogProps}>
        {children}
      </Dialog>
    </>
  )
}

export default DialogButton
