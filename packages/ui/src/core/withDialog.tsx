import React from 'react'
import Box from './Box'
import Dialog, { DialogProps } from './Dialog'
import useOpen from '../hooks/useOpen'

export interface WithDialogProps extends Omit<DialogProps, 'open'> {}

const withDialog = (props: WithDialogProps) => (children) => {
  const { ...rest } = props

  const [isOpen, { open, close }] = useOpen()

  // Escape if no dialogProps
  const hasDialogProps = rest.title || rest.children
  if (!hasDialogProps) return children

  return (
    <>
      <Box onClick={open}>{children}</Box>
      <Dialog open={isOpen} onClose={close} {...rest} />
    </>
  )
}

export default withDialog
