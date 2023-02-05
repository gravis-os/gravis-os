import React from 'react'
import NextNProgress from 'nextjs-progressbar'
import { NextSeo, NextSeoProps } from 'next-seo'
import {
  Box,
  BoxProps,
  Stack,
  StackProps,
  Header,
  HeaderProps,
  Footer,
  FooterProps,
} from '@gravis-os/ui'

export interface LandingLayoutProps extends StackProps {
  headerProps?: HeaderProps
  footerProps?: FooterProps
  bodyProps?: BoxProps
  backgroundColor?: string

  // Gutters (vertical)
  disableGutters?: boolean
  disableGutterTop?: boolean
  disableGutterBottom?: boolean
  gutterSize?: number

  // Next-seo
  seo?: NextSeoProps
}

const LandingLayout: React.FC<LandingLayoutProps> = (props) => {
  const {
    headerProps,
    footerProps,
    children,
    sx,
    bodyProps,
    backgroundColor,
    disableGutters,
    disableGutterTop,
    disableGutterBottom,
    gutterSize = 2,

    // seo
    seo,

    ...rest
  } = props

  return (
    <Stack sx={{ minHeight: '100vh', backgroundColor, ...sx }} {...rest}>
      <NextNProgress />

      {/* SEO */}
      {seo && <NextSeo {...seo} />}

      {/* Header */}
      {headerProps && <Header {...headerProps} />}

      <Box
        {...bodyProps}
        sx={{
          flexGrow: 1,
          ...(backgroundColor && {
            '&, & > .MuiBox-root': {
              backgroundColor,
            },
          }),

          // Gutters
          ...(!(disableGutterTop || disableGutters) && { pt: gutterSize }),
          ...(!(disableGutterBottom || disableGutters) && { pb: gutterSize }),

          ...bodyProps?.sx,
        }}
      >
        {children}
      </Box>

      {/* Footer */}
      {footerProps && <Footer {...footerProps} />}
    </Stack>
  )
}

export default LandingLayout
