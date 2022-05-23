import React from 'react'
import { Typography, TypographyProps } from '@gravis-os/ui'

export interface FieldLabelProps extends TypographyProps {}

const FieldLabel: React.FC<FieldLabelProps> = (props) => {
  const { children, sx, ...rest } = props

  return (
    <Typography
      variant="overline"
      color="text.secondary"
      sx={{ mb: 1, display: 'block', ...sx }}
      {...rest}
    >
      {children}
    </Typography>
  )
}

export default FieldLabel
