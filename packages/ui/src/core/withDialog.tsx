import React from 'react'
import useOpen from '../hooks/useOpen'
import Dialog, { DialogProps } from './Dialog'

const withDialog = (props: Omit<DialogProps, 'open'>) => (children) => {
  const { ...rest } = props

  const [isOpen, open, close] = useOpen()

  return (
    <Dialog open={isOpen} onClose={close} {...rest}>
      {children}
    </Dialog>
  )
}

export default withDialog
