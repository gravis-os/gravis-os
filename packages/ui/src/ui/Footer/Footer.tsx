import React from 'react'
import { Box, Container, Divider, Grid, Stack, Typography } from '@mui/material'
import NavAccordion from '../NavAccordion'

interface FooterNavItem {
  title: string
  items: Array<{ title: string; href: string }>
}

export interface FooterProps {
  companyName: string
  navItems: FooterNavItem[]
  socialMediaLinks?: Record<string, string>
  logo?: React.ReactElement
}

const Footer: React.FC<FooterProps> = (props) => {
  const { logo, companyName, socialMediaLinks, navItems } = props

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

        <Divider sx={{ my: 2, display: { xs: 'none', md: 'block' } }} />

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
