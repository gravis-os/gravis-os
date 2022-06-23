import React from 'react'
import LandingLayout from './LandingLayout'
import {
  MOCK_HEADER_PROPS,
  MOCK_FOOTER_PROPS,
  MOCK_BLOCKS_JSX,
} from '../../mocks'

export default {
  title: 'Components/LandingLayout',
  component: LandingLayout,
  parameters: { layout: 'fullscreen' },
  args: {
    headerProps: MOCK_HEADER_PROPS,
    footerProps: MOCK_FOOTER_PROPS,
    children: MOCK_BLOCKS_JSX,
  },
}

export const Basic = (args) => <LandingLayout {...args} />
