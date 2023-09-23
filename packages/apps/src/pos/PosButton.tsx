import React from 'react'

import { Button, ButtonProps } from '@gravis-os/ui'

export interface PosButtonProps extends ButtonProps {}

const PosButton: React.FC<PosButtonProps> = (props) => {
  const { children, ...rest } = props

  return <Button {...rest}>{children}</Button>
}

export default PosButton
