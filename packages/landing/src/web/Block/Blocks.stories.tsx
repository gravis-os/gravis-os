import React from 'react'

import { MOCK_BLOCK_ALTERNATE_WING_GRID, MOCK_BLOCKS } from '../../mocks'
import getStorybookTitle from '../../utils/getStorybookTitle'
import Blocks from './Blocks'

export default {
  title: getStorybookTitle(Blocks.name),
  args: {
    items: MOCK_BLOCKS,
  },
  component: Blocks,
  parameters: {
    backgrounds: {
      default: 'light',
      values: [{ name: 'light', value: '#eee' }],
    },
    layout: 'fullscreen',
  },
}

const Template = (args) => <Blocks {...args} />

export const Basic = Template.bind({})
Basic.args = {}

export const AlternateWingGrid = Template.bind({})
AlternateWingGrid.args = {
  items: [MOCK_BLOCK_ALTERNATE_WING_GRID],
}
