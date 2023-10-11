'use client'

import React from 'react'

import { WithPaletteModeProps, withPaletteMode } from '@gravis-os/theme'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import YouTubeIcon from '@mui/icons-material/YouTube'
import startCase from 'lodash/startCase'

import Box from '../Box'
import Container from '../Container'
import Divider from '../Divider'
import Grid from '../Grid'
import IconButton from '../IconButton'
import Link from '../Link'
import NavAccordion, { NavAccordionProps } from '../NavAccordion'
import Stack from '../Stack'
import Typography from '../Typography'

export type SocialItemType =
  | 'behance'
  | 'dribbble'
  | 'facebook'
  | 'github'
  | 'instagram'
  | 'linkedin'
  | 'medium'
  | 'twitter'

export type LegalItemType = 'cookies' | 'privacy' | 'terms'

export interface FooterNavItem {
  items: Array<{ href: string; title: string }>
  title: string
}

export interface FooterProps extends WithPaletteModeProps {
  accordionProps?: Omit<NavAccordionProps, 'title'>
  callout?: React.ReactNode
  companyName: string
  disableCallout?: boolean
  legalItems?: { [type in LegalItemType]?: string }
  logo?: React.ReactElement
  navItems: FooterNavItem[]
  socialMediaItems?: { [type in SocialItemType]?: string }
}

const Footer: React.FC<FooterProps> = (props) => {
  const {
    accordionProps,
    callout,
    companyName,
    dark,
    disableCallout,
    legalItems,
    logo,
    mode,
    navItems: injectedNavItems,
    socialMediaItems,
  } = props

  const navItems = injectedNavItems?.filter(Boolean)

  const childrenJsx = (
    <>
      {!disableCallout && callout}

      {/* Footer */}
      <Box
        bgcolor="background.paper"
        component="footer"
        py={2}
        textAlign={{ xs: 'center', md: 'left' }}
      >
        <Container disableGuttersOnMobile>
          <Box sx={{ py: { xs: 0, md: 4 } }}>
            <Grid container spacing={{ xs: 0, md: 5 }}>
              {logo && (
                <Grid item md={4} xs={12}>
                  <Box
                    display="flex"
                    justifyContent={{ xs: 'center', md: 'flex-start' }}
                    pt={2}
                    sx={{ mb: { xs: 2, md: 0 } }}
                  >
                    {logo}
                  </Box>
                </Grid>
              )}
              {navItems?.map((navItem) => {
                return (
                  <Grid item key={navItem.title} md xs={12}>
                    <NavAccordion
                      id={navItem.title}
                      px={{ xs: 2, sm: 3, md: 2 }}
                      {...accordionProps}
                      {...navItem}
                    />
                  </Grid>
                )
              })}
            </Grid>
          </Box>

          <Box mt={2}>
            <Stack
              alignItems="center"
              direction={{ xs: 'column-reverse', md: 'row' }}
              justifyContent="space-between"
              spacing={2}
            >
              {/* Legal items */}
              <Stack
                alignItems="center"
                direction="row"
                justifyContent={{ xs: 'center', md: 'flex-start' }}
                spacing={1}
              >
                {legalItems &&
                  Object.entries(legalItems)?.map(([key, href]) => {
                    if (!key || !href) return null

                    return (
                      <Link
                        href={href}
                        key={key}
                        sx={{ color: 'text.secondary' }}
                        targetBlank
                      >
                        <Typography sx={{ display: 'block' }} variant="caption">
                          {startCase(key)}
                        </Typography>
                      </Link>
                    )
                  })}
              </Stack>

              {/* Social media urls */}
              <Stack
                alignItems="center"
                direction="row"
                justifyContent={{ xs: 'center', md: 'flex-end' }}
                spacing={1}
              >
                {socialMediaItems &&
                  Object.entries(socialMediaItems)?.map(([type, href]) => {
                    if (!type || !href) return null

                    const keyIconMap = {
                      facebook: FacebookOutlinedIcon,
                      instagram: InstagramIcon,
                      linkedin: LinkedInIcon,
                      twitter: TwitterIcon,
                      youtube: YouTubeIcon,
                    }
                    const Icon = keyIconMap[type]
                    const ariaLabel = `${type} button`

                    if (!Icon) return null

                    return (
                      <Link
                        aria-label={ariaLabel}
                        href={href}
                        key={type}
                        target="_blank"
                      >
                        <IconButton aria-label={ariaLabel} size="small">
                          <Icon fontSize="inherit" />
                        </IconButton>
                      </Link>
                    )
                  })}
              </Stack>
            </Stack>
          </Box>

          <Divider
            sx={{ display: { xs: 'none', md: 'block' }, mb: 2, mt: 1 }}
          />

          <Box mt={2}>
            <Stack
              alignItems="center"
              direction={{ xs: 'column-reverse', md: 'row' }}
              justifyContent="space-between"
            >
              <Typography color="text.secondary" variant="caption">
                {/* The following line replaces only the last period at the end of the company name. */}
                Copyright ©{new Date().getFullYear()}{' '}
                {companyName?.replace(/\.$/, '')}. All rights reserved.
              </Typography>
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  )

  return withPaletteMode({
    dark,
    mode,
  })(childrenJsx)
}

export default Footer
