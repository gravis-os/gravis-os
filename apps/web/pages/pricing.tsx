import React from 'react'
import LandingLayout from '@web/layouts/LandingLayout'
import { Box, Container } from '@gravis-os/ui'

export interface PricingPageProps {}

const PricingPage: React.FC<PricingPageProps> = (props) => {
  return (
    <LandingLayout>
      <Container>
        <Box center>Pricing page</Box>
      </Container>
    </LandingLayout>
  )
}

export default PricingPage
