import React from 'react'
import {
  NavAccordion,
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
  Link,
  IconButton,
} from '@gravis-os/ui'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import YouTubeIcon from '@mui/icons-material/YouTube'

interface FooterNavItem {
  title: string
  items: Array<{ title: string; href: string }>
}

export interface FooterProps {
  companyName: string
  navItems: FooterNavItem[]
  socialMediaLinks?: Record<string, string>
  logo?: React.ReactElement
  socialMediaUrls?: { [key: string]: string }
  legalItems?: Array<{ key: string; title: string; href: string }>
}

const Footer: React.FC<FooterProps> = (props) => {
  const { logo, companyName, socialMediaUrls, legalItems, navItems } = props

  return (
    <Box
      component="footer"
      textAlign={{ xs: 'center', md: 'left' }}
      py={2}
      bgcolor="background.paper"
    >
      <Container>
        <Box sx={{ py: { xs: 0, md: 4 } }}>
          <Grid container spacing={{ xs: 1, md: 5 }}>
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
            {navItems.map((navGroup) => {
              return (
                <Grid key={navGroup.title} item xs={12} md>
                  <NavAccordion disablePadding {...navGroup} />
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
              {legalItems?.map((legalItem) => {
                return (
                  <Link key={legalItem.key} href={legalItem.href}>
                    <Typography variant="caption" color="text.secondary">
                      {legalItem.title}
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
              {socialMediaUrls &&
                Object.entries(socialMediaUrls)?.map(
                  ([socialMediaKey, url]) => {
                    if (!url) return null

                    const keyIconMap = {
                      facebook: FacebookOutlinedIcon,
                      twitter: TwitterIcon,
                      instagram: InstagramIcon,
                      linkedin: LinkedInIcon,
                      youtube: YouTubeIcon,
                    }
                    const Icon = keyIconMap[socialMediaKey]

                    return (
                      <Link key={socialMediaKey} href={url} target="_blank">
                        <IconButton size="small">
                          <Icon fontSize="inherit" />
                        </IconButton>
                      </Link>
                    )
                  }
                )}
            </Stack>
          </Stack>
        </Box>

        <Divider sx={{ mt: 1, mb: 2, display: { xs: 'none', md: 'block' } }} />

        <Box mt={2}>
          <Stack
            direction={{ xs: 'column-reverse', md: 'row' }}
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="caption" color="text.secondary">
              Copyright © {new Date().getFullYear()} {companyName}. All rights
              reserved.
            </Typography>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
