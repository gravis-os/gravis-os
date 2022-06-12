import React from 'react'
import { Stack, StackProps, Typography } from '@gravis-os/ui'

export interface FormSectionReadOnlyStackProps extends StackProps {
  title: string
  label: string
}

const FormSectionReadOnlyStack: React.FC<FormSectionReadOnlyStackProps> = (
  props
) => {
  const { title, label, children, ...rest } = props
  return (
    <Stack spacing={1}>
      <Stack spacing={0.5} {...rest}>
        <Typography variant="overline" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="subtitle1">{title}</Typography>
      </Stack>

      {children}
    </Stack>
  )
}

export default FormSectionReadOnlyStack
