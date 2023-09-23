import React from 'react'

import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import Reveal from './Reveal'

/* Constants */
export default {
  title: getCoreStorybookTitle(Reveal.name),
  args: {
    children: 'Label',
  },
  argTypes: {
    bottom: {
      control: { type: 'boolean' },
    },
    cascase: {
      control: { type: 'boolean' },
    },
    left: {
      control: { type: 'boolean' },
    },
  },
  component: Reveal,
}

/* Template */
const Template = (args) => <Reveal {...args} />

/* Variants */
export const Basic = Template.bind({})
Basic.args = {}
