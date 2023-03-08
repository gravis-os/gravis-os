import React from 'react'
import {
  Typography as MuiTypography,
  TypographyProps as MuiTypographyProps,
} from '@mui/material'
import get from 'lodash/get'
import flowRight from 'lodash/flowRight'
import Stack, { StackProps } from './Stack'
import { RevealProps } from './Reveal'
import withReveal from './withReveal'
import withHref, { WithHrefProps } from './withHref'

export interface TypographyProps extends Omit<MuiTypographyProps, 'maxWidth'> {
  startIcon?: React.ReactElement
  endIcon?: React.ReactElement
  spacing?: StackProps['spacing']
  maxWidth?: boolean | string // percentage e.g. '80%'. Shorthand for sx.maxWidth
  gradient?: string | { from: string; to: string; angle?: string }
  maxLines?: number
  component?: string
  reveal?: boolean | RevealProps
  href?: WithHrefProps['href']
  hrefProps?: Omit<WithHrefProps, 'href'>
}

const Typography: React.FC<TypographyProps> = (props) => {
  const {
    gradient,
    maxWidth,
    startIcon,
    endIcon,
    reveal,
    spacing = 0.5,
    maxLines,
    sx,
    href,
    hrefProps,
    ...rest
  } = props
  const { color } = rest

  const childrenJsx = (
    <MuiTypography
      sx={{
        ...(maxWidth && {
          display: 'inline-block',
          maxWidth: { md: typeof maxWidth === 'boolean' ? '80%' : maxWidth },
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

  return flowRight([withHref({ href, ...hrefProps }), withReveal({ reveal })])(
    childrenJsx
  )
}

export default Typography
