import React from 'react'

import { Typography, TypographyProps } from '@gravis-os/ui'

export interface FieldLabelProps extends TypographyProps {}

const FieldLabel: React.FC<FieldLabelProps> = (props) => {
  const { children, sx, ...rest } = props

  return (
    <Typography
      color="text.secondary"
      sx={{ display: 'block', mb: 1, ...sx }}
      variant="overline"
      {...rest}
    >
      {children}
    </Typography>
  )
}

export default FieldLabel
