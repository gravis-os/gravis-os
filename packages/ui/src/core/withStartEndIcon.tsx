import type { TypographyProps as MuiTypographyProps } from '@mui/material'

import React from 'react'

import Stack, { StackProps } from './Stack'

export interface WithStartEndIconProps {
  color?: MuiTypographyProps['color']
  endIcon?: React.ReactElement
  spacing?: StackProps['spacing']
  startIcon?: React.ReactElement
}

const withStartEndIcon = (props: WithStartEndIconProps) => (children) => {
  const { color, endIcon, spacing, startIcon } = props

  if (!(startIcon || endIcon)) return children

  return (
    <Stack
      alignItems="center"
      direction="row"
      spacing={spacing}
      sx={{
        '& .MuiSvgIcon-root': {
          // Position
          position: 'relative',
          top: 0.5,

          // Color
          ...(Boolean(color) && {
            color: String(color).includes('.') ? color : `${color}.main`,
          }),
        },

        // Hover color
        '&:hover': {
          '& .MuiTypography-root, & .MuiSvgIcon-root': {
            color: `${color}.dark`,
          },
        },
      }}
    >
      {startIcon}
      {children}
      {endIcon}
    </Stack>
  )
}

export default withStartEndIcon
