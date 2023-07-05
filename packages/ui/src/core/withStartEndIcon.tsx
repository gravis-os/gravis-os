import React from 'react'
import Stack from './Stack'
import { TypographyProps } from './Typography'

export interface withStartEndIconProps {
  startIcon?: TypographyProps['startIcon']
  endIcon?: TypographyProps['endIcon']
  spacing?: TypographyProps['spacing']
  color?: TypographyProps['color']
}

const withStartEndIcon = (props: withStartEndIconProps) => {
  const { startIcon, endIcon, spacing, color } = props
  if (startIcon || endIcon) {
    const getIconColor = (color) => {
      if (!color) return
      return color.includes('.') ? color : `${color}.main`
    }
    return (children) => (
      <Stack
        direction="row"
        alignItems="center"
        spacing={spacing}
        sx={{ '& .MuiSvgIcon-root': { color: getIconColor(color) } }}
      >
        {startIcon}
        {children}
        {endIcon}
      </Stack>
    )
  }
  return (children) => children
}

export default withStartEndIcon
