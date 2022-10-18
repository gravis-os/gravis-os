import React from 'react'
import { MOCK_BLOCKS, MOCK_BLOCK_ALTERNATE_WING_GRID } from '../../mocks'
import getStorybookTitle from '../../utils/getStorybookTitle'
import Blocks from './Blocks'

export default {
  component: Blocks,
  title: getStorybookTitle(Blocks.displayName),
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
