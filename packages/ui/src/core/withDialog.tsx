import React from 'react'

import dynamic from 'next/dynamic'

import type { DialogProps } from './Dialog'

import useOpen from '../hooks/useOpen'
import Box from './Box'

const DynamicDialog = dynamic(() => import('./Dialog'))

export interface WithDialogProps extends Omit<DialogProps, 'open'> {}

const withDialog = (props: WithDialogProps) => (children) => {
  const { ...rest } = props

  const [isOpen, { close, open }] = useOpen()

  // Escape if no dialogProps
  const hasDialogProps = rest.title || rest.children
  if (!hasDialogProps) return children

  return (
    <>
      <Box onClick={open}>{children}</Box>

      {isOpen && <DynamicDialog onClose={close} open={isOpen} {...rest} />}
    </>
  )
}

export default withDialog
