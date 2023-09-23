import React from 'react'

import {
  Typography as MuiTypography,
  TypographyProps as MuiTypographyProps,
} from '@mui/material'
import flowRight from 'lodash/flowRight'
import get from 'lodash/get'

import { RevealProps } from './Reveal'
import withHref, { WithHrefProps } from './withHref'
import withReveal from './withReveal'
import withStartEndIcon, { WithStartEndIconProps } from './withStartEndIcon'

export interface TypographyProps extends Omit<MuiTypographyProps, 'maxWidth'> {
  component?: string
  endIcon?: WithStartEndIconProps['endIcon']
  gradient?: { angle?: string; from: string; to: string } | string
  hoverColor?: MuiTypographyProps['color']
  href?: WithHrefProps['href']
  hrefProps?: Omit<WithHrefProps, 'href'>
  maxLines?: number
  maxWidth?: boolean | string // percentage e.g. '80%'. Shorthand for sx.maxWidth

  reveal?: RevealProps | boolean
  spacing?: WithStartEndIconProps['spacing']
  startIcon?: WithStartEndIconProps['startIcon']
}

const Typography: React.FC<TypographyProps> = (props) => {
  const {
    endIcon,
    gradient,
    hoverColor,
    href,
    hrefProps,
    maxLines,
    maxWidth,
    reveal,
    spacing = 0.5,
    startIcon,
    sx,
    ...rest
  } = props
  const { color } = rest

  const childrenJsx = (
    <MuiTypography
      sx={{
        // maxWidth
        ...(maxWidth && {
          display: 'inline-block',
          maxWidth: { md: typeof maxWidth === 'boolean' ? '80%' : maxWidth },
        }),

        // gradient
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
          overflowY: 'hidden',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: maxLines,
        }),

        // Hover color
        ...(hoverColor && { '&:hover': { color: hoverColor } }),

        ...sx,
      }}
      {...rest}
    />
  )

  return flowRight([
    withHref({ href, ...hrefProps }),
    withReveal({ reveal }),
    withStartEndIcon({ color, endIcon, spacing, startIcon }),
  ])(childrenJsx)
}

export default Typography
