import React from 'react'
import {
  Typography as MuiTypography,
  TypographyProps as MuiTypographyProps,
} from '@mui/material'
import get from 'lodash/get'
import Stack, { StackProps } from './Stack'

export interface TypographyProps extends Omit<MuiTypographyProps, 'maxWidth'> {
  startIcon?: React.ReactElement
  endIcon?: React.ReactElement
  spacing?: StackProps['spacing']
  maxWidth?: boolean | string // percentage e.g. '80%'. Shorthand for sx.maxWidth
  gradient?: string | { from: string; to: string; angle?: string }
  maxLines?: number
  component?: string
}

const Typography: React.FC<TypographyProps> = (props) => {
  const {
    gradient,
    maxWidth,
    startIcon,
    endIcon,
    spacing = 0.5,
    maxLines,
    sx,
    ...rest
  } = props
  const { color } = rest

  const childrenJsx = (
    <MuiTypography
      sx={{
        ...(maxWidth && {
          maxWidth: typeof maxWidth === 'boolean' ? '80%' : maxWidth,
          mx: 'auto',
        }),

        ...(gradient && {
          background: (theme) => {
            return typeof gradient === 'string'
              ? `linear-gradient(${gradient})`
              : `linear-gradient(${gradient.angle || '60deg'}, ${
                  get(theme.palette, gradient.from) || gradient.from
                }, ${get(theme.palette, gradient.to) || gradient.to})`
          },
          backgroundClip: 'text',
          color: 'transparent',
        }),

        // maxLines
        ...(maxLines && {
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: maxLines,
          overflowY: 'hidden',
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
