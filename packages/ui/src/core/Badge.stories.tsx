import React from 'react'

import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import Badge from './Badge'
import Button from './Button'
/* Constants */
const colors = ['primary', 'secondary', 'success', 'error', 'info', 'warning']
const variants = ['standard', 'dot', 'string']
export default {
  title: getCoreStorybookTitle(Badge.name),
  args: {
    badgeContent: '99+',
  },
  argTypes: {
    color: {
      control: { type: 'select' },
      options: colors,
    },
    variant: {
      control: { type: 'select' },
      options: variants,
    },
  },
  component: Badge,
}

/* Template */
const Template = (args) => (
  <Badge {...args}>
    <Button variant="contained">Label</Button>
  </Badge>
)

/* Variants */
export const Basic = Template.bind({})
Basic.args = {}

export const Contained = Template.bind({})
Contained.args = { color: 'primary', variant: 'standard' }

export const Dot = Template.bind({})
Dot.args = { color: 'primary', variant: 'dot' }

export const String = Template.bind({})
String.args = { color: 'primary', variant: 'string' }
