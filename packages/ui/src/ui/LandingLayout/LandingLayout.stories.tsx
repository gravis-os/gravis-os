import React from 'react'
import LandingLayout from './LandingLayout'
import { MOCK_HEADER_PROPS, MOCK_FOOTER_PROPS } from '../../mocks'
import Box from '../Box'
import Typography from '../Typography'

export default {
  title: 'Components/LandingLayout',
  component: LandingLayout,
  parameters: { layout: 'fullscreen' },
  args: {
    headerProps: MOCK_HEADER_PROPS,
    footerProps: MOCK_FOOTER_PROPS,
    children: (
      <Box py={15} sx={{ backgroundColor: 'common.white' }} center reveal>
        <Typography variant="h3">
          Custom Business Software Made for Market Leaders
        </Typography>
        <Typography>
          We build modern system architectures and scalable applications that
          radically transform business performance.
        </Typography>
      </Box>
    ),
  },
}

export const Basic = (args) => <LandingLayout {...args} />
