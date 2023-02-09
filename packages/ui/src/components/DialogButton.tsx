import React from 'react'
import Button, { ButtonProps } from '../core/Button'
import Dialog, { DialogProps } from '../core/Dialog'
import useOpen from '../hooks/useOpen'

export interface DialogButtonProps extends Omit<ButtonProps, 'title'> {
  children?: React.ReactNode
  open?: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  title?: ButtonProps['children']
  dialogProps?: Omit<DialogProps, 'open'>
  onClose?: () => void
}

const DialogButton: React.FC<DialogButtonProps> = (props) => {
  const {
    children,
    title,
    open: injectedOpen = false,
    setOpen: injectedSetOpen,
    onClose: injectedOnClose,
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

      <Dialog
        open={injectedOpen || isOpen}
        onClose={() => {
          close()
          injectedOnClose?.()
        }}
        {...dialogProps}
      >
        {children}
      </Dialog>
    </>
  )
}

export default DialogButton
