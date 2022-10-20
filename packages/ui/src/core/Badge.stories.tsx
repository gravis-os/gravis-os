import React from 'react'
import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import Badge from './Badge'
import Button from './Button'
/* Constants */
const colors = ['primary', 'secondary', 'success', 'error', 'info', 'warning']
const variants = ['standard', 'dot', 'string']
export default {
  title: getCoreStorybookTitle(Badge.name),
  component: Badge,
  args: {
    badgeContent: '99+',
  },
  argTypes: {
    color: {
      options: colors,
      control: { type: 'select' },
    },
    variant: {
      options: variants,
      control: { type: 'select' },
    },
  },
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
Contained.args = { variant: 'standard', color: 'primary' }

export const Dot = Template.bind({})
Dot.args = { variant: 'dot', color: 'primary' }

export const String = Template.bind({})
String.args = { variant: 'string', color: 'primary' }
