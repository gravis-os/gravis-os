'use client'

import React from 'react'

import {
  Box,
  BoxProps,
  Breadcrumbs,
  BreadcrumbsProps,
  Footer,
  FooterProps,
  Header,
  HeaderProps,
  Stack,
  StackProps,
} from '@gravis-os/ui'
import { NextSeo, NextSeoProps } from 'next-seo'
import { usePathname, useSearchParams } from 'next/navigation'
import NextNProgress from 'nextjs-progressbar'

import { useLayout } from '../../providers/LayoutProvider'

export interface LandingLayoutProps extends StackProps {
  autoBreadcrumbs?: boolean
  backgroundColor?: string
  bodyProps?: BoxProps
  // Breadcrumbs
  breadcrumbs?: BreadcrumbsProps['items']

  breadcrumbsProps?: Omit<BreadcrumbsProps, 'items'>
  // Header styles
  darkHeader?: boolean

  disableGutterBottom?: boolean
  disableGutterTop?: boolean
  // Gutters (vertical)
  disableGutters?: boolean

  footerProps?: FooterProps
  gutterSize?: number
  headerProps?: HeaderProps
  // Next-seo
  seo?: NextSeoProps

  transparentHeader?: boolean
}

const LandingLayout: React.FC<LandingLayoutProps> = (props) => {
  const {
    // Breadcrumbs
    autoBreadcrumbs,
    backgroundColor,
    bodyProps,
    breadcrumbs,
    breadcrumbsProps: injectedBreadcrumbsProps,
    children,
    // Header styles
    darkHeader,
    disableGutterBottom,
    disableGutters,
    disableGutterTop,

    footerProps,
    gutterSize = 2,

    headerProps: injectedHeaderProps,
    // seo
    seo,
    sx,

    transparentHeader,

    ...rest
  } = props

  const headerProps = {
    ...injectedHeaderProps,
    ...(darkHeader && {
      dark: true,
      position: 'fixed' as const,
      translucent: true,
    }),
    ...(transparentHeader && {
      position: 'fixed' as const,
      textColor: 'common.white',
      transparent: true,
    }),
  }

  const breadcrumbsProps = {
    autoBreadcrumbs,
    container: true,
    disableHomeBreadcrumb: true,
    ...injectedBreadcrumbsProps,
    sx: { my: 0.5, ...injectedBreadcrumbsProps?.sx },
  }

  const { routeConfig, site } = useLayout()

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const asPath = `${pathname}?${searchParams}`
  const isHomeRoute = pathname === routeConfig?.HOME

  return (
    <Stack sx={{ backgroundColor, minHeight: '100vh', ...sx }} {...rest}>
      <NextNProgress />

      {/* SEO */}
      {seo && (
        <NextSeo
          {...{
            ...(isHomeRoute ? {} : { titleTemplate: `%s | ${site?.title}` }),
            ...seo,
            openGraph: {
              ...seo.openGraph,
              url: `${site?.absolute_url}${asPath}`,
            },
          }}
        />
      )}

      {/* Header */}
      {headerProps && (
        <Header
          {...{
            accordionProps: { titleProps: { variant: 'h5' } },
            disableBoxShadow: true,
            drawerWidth: '100vw',
            ...headerProps,
          }}
        />
      )}

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
      {footerProps && (
        <Footer
          {...{
            ...footerProps,
            accordionProps: {
              itemTitleProps: {
                color: 'text.secondary',
                hoverColor: 'inherit',
                variant: 'body2',
              },
              titleProps: { variant: 'h7' },
            },
            companyName: site?.company_title,
          }}
        />
      )}
    </Stack>
  )
}

export default LandingLayout
