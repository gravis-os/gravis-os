import React from 'react'
import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import Reveal from './Reveal'

/* Constants */
export default {
  title: getCoreStorybookTitle(Reveal.name),
  component: Reveal,
  args: {
    children: 'Label',
  },
  argTypes: {
    cascase: {
      control: { type: 'boolean' },
    },
    left: {
      control: { type: 'boolean' },
    },
    bottom: {
      control: { type: 'boolean' },
    },
  },
}

/* Template */
const Template = (args) => <Reveal {...args} />

/* Variants */
export const Basic = Template.bind({})
Basic.args = {}
