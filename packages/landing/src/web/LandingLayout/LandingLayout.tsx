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
  Breadcrumbs,
  BreadcrumbsProps,
} from '@gravis-os/ui'

export interface LandingLayoutProps extends StackProps {
  headerProps?: HeaderProps
  footerProps?: FooterProps
  bodyProps?: BoxProps
  backgroundColor?: string

  // Header styles
  darkHeader?: boolean
  transparentHeader?: boolean

  // Breadcrumbs
  breadcrumbs?: BreadcrumbsProps['items']
  breadcrumbsProps?: Omit<BreadcrumbsProps, 'items'>
  autoBreadcrumbs?: boolean

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
    headerProps: injectedHeaderProps,
    footerProps,
    children,
    sx,
    bodyProps,
    backgroundColor,
    disableGutters,
    disableGutterTop,
    disableGutterBottom,
    gutterSize = 2,

    // Header styles
    darkHeader,
    transparentHeader,

    // Breadcrumbs
    autoBreadcrumbs,
    breadcrumbs,
    breadcrumbsProps: injectedBreadcrumbsProps,

    // seo
    seo,

    ...rest
  } = props

  const headerProps = {
    ...injectedHeaderProps,
    ...(darkHeader && {
      dark: true,
      translucent: true,
      position: 'fixed' as const,
    }),
    ...(transparentHeader && {
      transparent: true,
      position: 'fixed' as const,
      textColor: 'common.white',
    }),
  }

  const breadcrumbsProps = {
    disableHomeBreadcrumb: true,
    container: true,
    autoBreadcrumbs,
    ...injectedBreadcrumbsProps,
    sx: { my: 0.5, ...injectedBreadcrumbsProps?.sx },
  }

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
        {/* Breadcrumbs */}
        {(autoBreadcrumbs || breadcrumbs) && (
          <Breadcrumbs
            items={breadcrumbs}
            maxItems={3}
            scrollOnOverflow
            {...breadcrumbsProps}
          />
        )}

        {children}
      </Box>

      {/* Footer */}
      {footerProps && <Footer {...footerProps} />}
    </Stack>
  )
}

export default LandingLayout
