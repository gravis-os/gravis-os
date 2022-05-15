import * as React from 'react'
import type { NextPage } from 'next'
import { Container, Typography, Box, Button } from '@gravis-os/ui'
import ProTip from '../src/ProTip'
import Copyright from '../src/Copyright'

const About: NextPage = () => (
  <Container maxWidth="lg">
    <Box
      sx={{
        my: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom>
        About
      </Typography>
      <Box maxWidth="sm">
        <Button href="/">Go to the home page</Button>
      </Box>
      <ProTip />
      <Copyright />
    </Box>
  </Container>
)

export default About
