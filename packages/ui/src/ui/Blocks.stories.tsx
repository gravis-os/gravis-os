import React from 'react'
import Blocks from './Blocks'
import { MOCK_BLOCK_ALTERNATE_WING_GRID, MOCK_BLOCKS } from '../mocks'

export default {
  title: 'ui/Blocks',
  component: Blocks,
  args: {
    items: MOCK_BLOCKS,
  },
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
      values: [{ name: 'light', value: '#eee' }],
    },
  },
}

const Template = (args) => <Blocks {...args} />

export const Basic = Template.bind({})
Basic.args = {}

export const AlternateWingGrid = Template.bind({})
AlternateWingGrid.args = {
  items: [MOCK_BLOCK_ALTERNATE_WING_GRID],
}
