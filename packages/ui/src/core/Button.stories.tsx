import React from 'react'

import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import Button from './Button'

/* Constants */
const colors = ['primary', 'secondary', 'success', 'error', 'info', 'warning']
const variants = ['contained', 'outlined']
const sizes = ['small', 'medium', 'large']
export default {
  title: getCoreStorybookTitle(Button.name),
  args: { children: 'Label', disabled: false, disableElevation: false },
  argTypes: {
    color: {
      control: { type: 'select' },
      options: colors,
    },
    size: {
      control: { type: 'select' },
      options: sizes,
    },
    variant: {
      control: { type: 'select' },
      options: variants,
    },
  },
  component: Button,
}

/* Template */
const Template = (args) => <Button {...args} />

/* Variants */
export const Basic = Template.bind({})
Basic.args = {}

export const Contained = Template.bind({})
Contained.args = { variant: 'contained' }

export const Outlined = Template.bind({})
Outlined.args = { variant: 'outlined' }

export const Small = Template.bind({})
Small.args = { size: 'small', variant: 'contained' }

export const Medium = Template.bind({})
Medium.args = { size: 'medium', variant: 'contained' }

export const Large = Template.bind({})
Large.args = { size: 'large', variant: 'contained' }
