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
  stretch?: boolean
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
    fullWidthOnMobile,
    reveal,
    center,
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

      // Center
      ...(center && {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }),

      // Stretch
      ...(stretch && {
        height: '100%',
      }),

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
