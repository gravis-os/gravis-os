import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import * as React from 'react'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import { Alert, Box, Stack, Typography } from '@gravis-os/ui'
import { printNumber } from '@gravis-os/utils'
import ProTip from '../src/ProTip'
import Copyright from '../src/Copyright'

const Home: NextPage = () => (
  <>
    <NextSeo
      title="Simple Home Example"
      description="A short description goes here."
    />

    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          MUI v5 + Next.js with TypeScript example 1
        </Typography>

        <Stack spacing={1}>
          <Button href="/about" color="primary">
            About page
          </Button>

          <Button href="/posts" color="primary">
            Posts page
          </Button>

          <Button href="/contact" color="primary">
            Contact page
          </Button>

          <Button href="/profile" color="primary">
            Profile page
          </Button>

          <Button href="/auth" color="primary">
            Auth page
          </Button>
        </Stack>

        <ProTip />
        <Copyright />
      </Box>

      <Alert severity="info" sx={{ py: 3 }}>
        Hello World
      </Alert>

      <Box
        sx={{
          py: 3,
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
        }}
        center
      >
        Hello World {printNumber(1000000, { type: 'amount', dp: 2 })}
      </Box>
    </Container>
  </>
)

export default Home
