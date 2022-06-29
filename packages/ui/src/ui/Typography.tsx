import React from 'react'
import {
  Typography as MuiTypography,
  TypographyProps as MuiTypographyProps,
} from '@mui/material'
import Stack, { StackProps } from './Stack'

export interface TypographyProps extends Omit<MuiTypographyProps, 'maxWidth'> {
  startIcon?: React.ReactElement
  endIcon?: React.ReactElement
  spacing?: StackProps['spacing']
  maxWidth?: boolean | string // percentage e.g. '80%'. Shorthand for sx.maxWidth
}

const Typography: React.FC<TypographyProps> = (props) => {
  const { maxWidth, startIcon, endIcon, spacing = 0.5, sx, ...rest } = props
  const { color } = rest

  const childrenJsx = (
    <MuiTypography
      sx={{
        ...(maxWidth && {
          maxWidth: typeof maxWidth === 'boolean' ? '80%' : maxWidth,
          mx: 'auto',
        }),
        ...sx,
      }}
      {...rest}
    />
  )

  if (startIcon || endIcon) {
    const getIconColor = (color) => {
      if (!color) return
      return color.includes('.') ? color : `${color}.main`
    }
    return (
      <Stack
        direction="row"
        alignItems="center"
        spacing={spacing}
        sx={{ '& .MuiSvgIcon-root': { color: getIconColor(color) } }}
      >
        {startIcon}
        {childrenJsx}
        {endIcon}
      </Stack>
    )
  }

  return childrenJsx
}

export default Typography
