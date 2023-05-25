import React from 'react'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import YouTubeIcon from '@mui/icons-material/YouTube'
import { withPaletteMode, WithPaletteModeProps } from '@gravis-os/theme'
import startCase from 'lodash/startCase'
import NavAccordion, { NavAccordionProps } from '../NavAccordion'
import Box from '../Box'
import Container from '../Container'
import Divider from '../Divider'
import Grid from '../Grid'
import Stack from '../Stack'
import Typography from '../Typography'
import Link from '../Link'
import IconButton from '../IconButton'

export type SocialItemType =
  | 'github'
  | 'medium'
  | 'behance'
  | 'twitter'
  | 'dribbble'
  | 'facebook'
  | 'linkedin'
  | 'instagram'

export type LegalItemType = 'terms' | 'privacy' | 'cookies'

export interface FooterNavItem {
  title: string
  items: Array<{ title: string; href: string }>
}

export interface FooterProps extends WithPaletteModeProps {
  companyName: string
  navItems: FooterNavItem[]
  logo?: React.ReactElement
  socialMediaItems?: { [type in SocialItemType]: string }
  legalItems?: { [type in LegalItemType]: string }
  accordionProps?: Omit<NavAccordionProps, 'title'>
  callout?: React.ReactNode
}

const Footer: React.FC<FooterProps> = (props) => {
  const {
    accordionProps,
    logo,
    companyName,
    socialMediaItems,
    legalItems,
    navItems: injectedNavItems,
    mode,
    dark,
    callout,
  } = props

  const navItems = injectedNavItems?.filter(Boolean)

  const childrenJsx = (
    <>
      {callout}

      {/* Footer */}
      <Box
        component="footer"
        textAlign={{ xs: 'center', md: 'left' }}
        py={2}
        bgcolor="background.paper"
      >
        <Container disableGuttersOnMobile>
          <Box sx={{ py: { xs: 0, md: 4 } }}>
            <Grid container spacing={{ xs: 0, md: 5 }}>
              {logo && (
                <Grid item xs={12} md={4}>
                  <Box
                    pt={2}
                    sx={{ mb: { xs: 2, md: 0 } }}
                    display="flex"
                    justifyContent={{ xs: 'center', md: 'flex-start' }}
                  >
                    {logo}
                  </Box>
                </Grid>
              )}
              {navItems?.map((navGroup) => {
                return (
                  <Grid key={navGroup.title} item xs={12} md>
                    <NavAccordion
                      px={{ xs: 2, sm: 3, md: 2 }}
                      {...accordionProps}
                      {...navGroup}
                    />
                  </Grid>
                )
              })}
            </Grid>
          </Box>

          <Box mt={2}>
            <Stack
              direction={{ xs: 'column-reverse', md: 'row' }}
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
            >
              {/* Legal items */}
              <Stack
                direction="row"
                alignItems="center"
                justifyContent={{ xs: 'center', md: 'flex-start' }}
                spacing={1}
              >
                {legalItems &&
                  Object.entries(legalItems)?.map(([key, href]) => {
                    if (!key || !href) return null

                    return (
                      <Link
                        key={key}
                        href={href}
                        sx={{ color: 'text.secondary' }}
                        targetBlank
                      >
                        <Typography variant="caption" sx={{ display: 'block' }}>
                          {startCase(key)}
                        </Typography>
                      </Link>
                    )
                  })}
              </Stack>

              {/* Social media urls */}
              <Stack
                direction="row"
                alignItems="center"
                justifyContent={{ xs: 'center', md: 'flex-end' }}
                spacing={1}
              >
                {socialMediaItems &&
                  Object.entries(socialMediaItems)?.map(([type, href]) => {
                    if (!type || !href) return null

                    const keyIconMap = {
                      facebook: FacebookOutlinedIcon,
                      twitter: TwitterIcon,
                      instagram: InstagramIcon,
                      linkedin: LinkedInIcon,
                      youtube: YouTubeIcon,
                    }
                    const Icon = keyIconMap[type]
                    const ariaLabel = `${type} button`

                    if (!Icon) return null

                    return (
                      <Link key={type} href={href} target="_blank" aria-label={ariaLabel}>
                        <IconButton size="small" aria-label={ariaLabel}>
                          <Icon fontSize="inherit" />
                        </IconButton>
                      </Link>
                    )
                  })}
              </Stack>
            </Stack>
          </Box>

          <Divider
            sx={{ mt: 1, mb: 2, display: { xs: 'none', md: 'block' } }}
          />

          <Box mt={2}>
            <Stack
              direction={{ xs: 'column-reverse', md: 'row' }}
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="caption" color="text.secondary">
                Copyright ©{new Date().getFullYear()} {companyName}. All rights
                reserved.
              </Typography>
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  )

  return withPaletteMode({
    mode,
    dark,
  })(childrenJsx)
}

export default Footer
