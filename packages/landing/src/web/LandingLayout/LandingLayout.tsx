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
import { useRouter } from 'next/router'
import { useLayout } from '../../providers/LayoutProvider'

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

  const { site, routeConfig } = useLayout()

  const router = useRouter()
  const isHomeRoute = router.pathname === routeConfig?.HOME

  return (
    <Stack sx={{ minHeight: '100vh', backgroundColor, ...sx }} {...rest}>
      <NextNProgress />

      {/* SEO */}
      {seo && (
        <NextSeo
          {...{
            ...(isHomeRoute ? {} : { titleTemplate: `%s | ${site?.title}` }),
            ...seo,
            openGraph: {
              ...seo.openGraph,
              url: `${site?.absolute_url}${router.asPath}`,
            },
            canonical: `${site?.absolute_url}${router.asPath.split('?')[0]}`,
          }}
        />
      )}

      {/* Header */}
      {headerProps && (
        <Header
          {...{
            accordionProps: { titleProps: { variant: 'h5' } },
            drawerWidth: '100vw',
            disableBoxShadow: true,
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
            companyName: site?.company_title,
            accordionProps: {
              titleProps: { variant: 'h7' },
              itemTitleProps: {
                variant: 'body2',
                color: 'text.secondary',
                hoverColor: 'inherit',
              },
            },
          }}
        />
      )}
    </Stack>
  )
}

export default LandingLayout
