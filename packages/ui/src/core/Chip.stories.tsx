import React from 'react'

import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import Chip from './Chip'

/* Constants */
const colors = ['primary', 'secondary', 'success', 'error', 'info', 'warning']
export default {
  title: getCoreStorybookTitle(Chip.name),
  args: {
    title: 'Label',
    color: 'primary',
  },
  argTypes: {
    color: {
      control: { type: 'select' },
      options: colors,
    },
  },
  component: Chip,
}

/* Template */
const Template = (args) => <Chip {...args} />

/* Variants */
export const Basic = Template.bind({})
Basic.args = {}
