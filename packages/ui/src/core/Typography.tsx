import React from 'react'
import {
  Typography as MuiTypography,
  TypographyProps as MuiTypographyProps,
} from '@mui/material'
import get from 'lodash/get'
import flowRight from 'lodash/flowRight'
import { RevealProps } from './Reveal'
import withReveal from './withReveal'
import withHref, { WithHrefProps } from './withHref'
import withStartEndIcon, { WithStartEndIconProps } from './withStartEndIcon'

export interface TypographyProps extends Omit<MuiTypographyProps, 'maxWidth'> {
  maxWidth?: boolean | string // percentage e.g. '80%'. Shorthand for sx.maxWidth
  gradient?: string | { from: string; to: string; angle?: string }
  maxLines?: number
  component?: string
  reveal?: boolean | RevealProps
  href?: WithHrefProps['href']
  hrefProps?: Omit<WithHrefProps, 'href'>
  hoverColor?: MuiTypographyProps['color']

  startIcon?: WithStartEndIconProps['startIcon']
  endIcon?: WithStartEndIconProps['endIcon']
  spacing?: WithStartEndIconProps['spacing']
}

const Typography: React.FC<TypographyProps> = (props) => {
  const {
    gradient,
    maxWidth,
    startIcon,
    endIcon,
    reveal,
    maxLines,
    sx,
    href,
    hrefProps,
    hoverColor,
    spacing = 0.5,
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
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: maxLines,
          overflowY: 'hidden',
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
    withStartEndIcon({ startIcon, endIcon, color, spacing }),
  ])(childrenJsx)
}

export default Typography
