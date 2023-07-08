import React from 'react'
import type { TypographyProps as MuiTypographyProps } from '@mui/material'
import Stack, { StackProps } from './Stack'

export interface WithStartEndIconProps {
  startIcon?: React.ReactElement
  endIcon?: React.ReactElement
  spacing?: StackProps['spacing']
  color?: MuiTypographyProps['color']
}

const withStartEndIcon = (props: WithStartEndIconProps) => (children) => {
  const { startIcon, endIcon, spacing, color } = props

  if (!(startIcon || endIcon)) return children

  return (
    <Stack
      direction="row"
      alignItems="center"
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
