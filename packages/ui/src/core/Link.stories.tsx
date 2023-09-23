import React from 'react'

import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import Link from './Link'

/* Constants */
const colors = ['primary', 'secondary', 'success', 'error', 'info', 'warning']
export default {
  title: getCoreStorybookTitle(Link.name),
  args: {
    children: 'Link',
    pointer: true,
  },
  argTypes: {
    color: {
      control: { type: 'select' },
      options: colors,
    },
    fadeOnHover: {
      control: { type: 'boolean' },
    },
    rightCaret: {
      control: { type: 'boolean' },
    },
  },
  component: Link,
}

/* Template */
const Template = (args) => <Link {...args} />

/* Variants */
export const Basic = Template.bind({})
Basic.args = {}

export const RightCaret = Template.bind({})
RightCaret.args = { rightCaret: true }

export const Fade = Template.bind({})
Fade.args = { color: 'primary', fadeOnHover: true }
