import React from 'react'
import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import ChipStack from './ChipStack'

/* Constants */
const directions = ['row', 'column']
export default {
  title: getCoreStorybookTitle(ChipStack.name),
  component: ChipStack,
  args: {
    items: [
      { title: 'Chip 1', color: 'primary' },
      { title: 'Chip 2', color: 'secondary' },
    ],
  },
  argTypes: {
    direction: {
      options: directions,
      control: { type: 'select' },
    },
  },
}

/* Template */
const Template = (args) => <ChipStack {...args} />

/* Variants */
export const Basic = Template.bind({})
Basic.args = {}

export const VerticalStack = Template.bind({})
VerticalStack.args = { direction: 'column' }
