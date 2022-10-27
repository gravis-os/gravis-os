import React from 'react'
import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import Button from './Button'

/* Constants */
const colors = ['primary', 'secondary', 'success', 'error', 'info', 'warning']
const variants = ['contained', 'outlined']
const sizes = ['small', 'medium', 'large']
export default {
  title: getCoreStorybookTitle(Button.name),
  component: Button,
  args: { children: 'Label', disabled: false, disableElevation: false },
  argTypes: {
    color: {
      options: colors,
      control: { type: 'select' },
    },
    variant: {
      options: variants,
      control: { type: 'select' },
    },
    size: {
      options: sizes,
      control: { type: 'select' },
    },
  },
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
Small.args = { variant: 'contained', size: 'small' }

export const Medium = Template.bind({})
Medium.args = { variant: 'contained', size: 'medium' }

export const Large = Template.bind({})
Large.args = { variant: 'contained', size: 'large' }
