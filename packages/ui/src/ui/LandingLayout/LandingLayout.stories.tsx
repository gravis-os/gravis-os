import React from 'react'
import LandingLayout from './LandingLayout'
import {
  MOCK_HEADER_PROPS,
  MOCK_FOOTER_PROPS,
  MOCK_BLOCK,
  MOCK_BLOCK_ALTERNATE_WING_GRID,
} from '../../mocks'
import Blocks from '../Blocks'

export default {
  title: 'Components/LandingLayout',
  component: LandingLayout,
  parameters: { layout: 'fullscreen' },
  args: {
    headerProps: MOCK_HEADER_PROPS,
    footerProps: MOCK_FOOTER_PROPS,
    children: <Blocks items={[MOCK_BLOCK, MOCK_BLOCK_ALTERNATE_WING_GRID]} />,
  },
}

export const Basic = (args) => <LandingLayout {...args} />
