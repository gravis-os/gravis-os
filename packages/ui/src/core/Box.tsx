import React, { forwardRef } from 'react'
import { Box as MuiBox, BoxProps as MuiBoxProps } from '@mui/material'
import flowRight from 'lodash/flowRight'
import { ResponsiveStyleValue } from '@mui/system/styleFunctionSx'
import { RevealProps } from './Reveal'
import withReveal from './withReveal'
import withHref, { WithHrefProps } from './withHref'

export interface BoxProps extends Omit<MuiBoxProps, 'pt' | 'py' | 'px' | 'pb'> {
  fullWidthOnMobile?: boolean
  center?: boolean
  centerOnMobile?: boolean
  stretch?: boolean
  fill?: boolean
  middle?: boolean
  reveal?: boolean | RevealProps
  href?: WithHrefProps['href']
  hrefProps?: Omit<WithHrefProps, 'href'>

  // Responsive padding
  pt?: ResponsiveStyleValue<any>
  py?: ResponsiveStyleValue<any>
  px?: ResponsiveStyleValue<any>
  pb?: ResponsiveStyleValue<any>
}

const Box: React.FC<BoxProps> = forwardRef((props, ref) => {
  const {
    href,
    hrefProps,
    stretch,
    fill,
    fullWidthOnMobile,
    reveal,
    center,
    centerOnMobile,
    middle,
    sx,
    children,

    // Responsive padding
    pt,
    py,
    px,
    pb,

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
        display: 'flex',
        alignItems: 'center',
      }),
      // Center
      ...(center && {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }),
      // centerOnMobile
      ...(centerOnMobile && {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: { xs: 'center', md: 'flex-start' },
        alignItems: { xs: 'center', md: 'flex-start' },
        textAlign: { xs: 'center', md: 'left' },
      }),

      // Stretch
      ...(stretch && { height: '100%' }),
      ...(fill && { width: '100%', height: '100%' }),

      // Responsive padding
      pt,
      py,
      px,
      pb,

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
