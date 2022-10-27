import React from 'react'
import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import Link from './Link'

/* Constants */
const colors = ['primary', 'secondary', 'success', 'error', 'info', 'warning']
export default {
  title: getCoreStorybookTitle(Link.name),
  component: Link,
  args: {
    children: 'Link',
    pointer: true,
  },
  argTypes: {
    color: {
      options: colors,
      control: { type: 'select' },
    },
    fadeOnHover: {
      control: { type: 'boolean' },
    },
    rightCaret: {
      control: { type: 'boolean' },
    },
  },
}

/* Template */
const Template = (args) => <Link {...args} />

/* Variants */
export const Basic = Template.bind({})
Basic.args = {}

export const RightCaret = Template.bind({})
RightCaret.args = { rightCaret: true }

export const Fade = Template.bind({})
Fade.args = { fadeOnHover: true, color: 'primary' }
