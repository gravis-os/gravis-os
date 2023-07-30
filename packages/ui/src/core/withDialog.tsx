import React from 'react'
import dynamic from 'next/dynamic'
import Box from './Box'
import type { DialogProps } from './Dialog'
import useOpen from '../hooks/useOpen'

const DynamicDialog = dynamic(() => import('./Dialog'))

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

      {isOpen && <DynamicDialog open={isOpen} onClose={close} {...rest} />}
    </>
  )
}

export default withDialog
