import type { ResponsiveStyleValue } from '@mui/system/styleFunctionSx'

import React, { forwardRef } from 'react'

import { Box as MuiBox, BoxProps as MuiBoxProps } from '@mui/material'
import flowRight from 'lodash/flowRight'

import { RevealProps } from './Reveal'
import withHref, { WithHrefProps } from './withHref'
import withReveal from './withReveal'

export interface BoxProps extends Omit<MuiBoxProps, 'pb' | 'pt' | 'px' | 'py'> {
  center?: boolean
  centerOnMobile?: boolean
  fill?: boolean
  fullWidthOnMobile?: boolean
  href?: WithHrefProps['href']
  hrefProps?: Omit<WithHrefProps, 'href'>
  middle?: boolean
  pb?: ResponsiveStyleValue<any>
  // Responsive padding
  pt?: ResponsiveStyleValue<any>

  px?: ResponsiveStyleValue<any>
  py?: ResponsiveStyleValue<any>
  reveal?: RevealProps | boolean
  stretch?: boolean
}

const Box: React.FC<BoxProps> = forwardRef((props, ref) => {
  const {
    center,
    centerOnMobile,
    children,
    fill,
    fullWidthOnMobile,
    href,
    hrefProps,
    middle,
    pb,
    // Responsive padding
    pt,
    px,

    py,
    reveal,
    stretch,
    sx,

    ...rest
  } = props

  const boxProps = {
    ref,
    sx: {
      // fullWidthOnMobile
      ...(fullWidthOnMobile && {
        width: { xs: '100%', md: 'initial' },
      }),

      // Middle
      ...(middle && {
        alignItems: 'center',
        display: 'flex',
      }),
      // Center
      ...(center && {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
      }),
      // centerOnMobile
      ...(centerOnMobile && {
        alignItems: { xs: 'center', md: 'flex-start' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: { xs: 'center', md: 'flex-start' },
        textAlign: { xs: 'center', md: 'left' },
      }),

      // Stretch
      ...(stretch && { height: '100%' }),
      ...(fill && { height: '100%', width: '100%' }),

      pb,
      // Responsive padding
      pt,
      px,
      py,

      ...sx,
    } as BoxProps['sx'],
    ...rest,
  }

  const enhancedChildren = withReveal({
    reveal,
  })(children)

  const childrenJsx = <MuiBox {...boxProps}>{enhancedChildren}</MuiBox>

  return flowRight([
    withHref({
      href,
      ...hrefProps,
    }),
  ])(childrenJsx)
})

export default Box
