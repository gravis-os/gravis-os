import { LocalActivity as LocalActivityIcon } from '@mui/icons-material'
import React from 'react'
import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import IconButton from './IconButton'

/* Constants */
const colors = ['primary', 'secondary', 'success', 'error', 'info', 'warning']
export default {
  title: getCoreStorybookTitle(IconButton.name),
  component: IconButton,
  args: {},
  argTypes: {
    color: {
      options: colors,
      control: { type: 'select' },
    },
    tooltip: {
      control: { type: 'text' },
    },
  },
}

/* Template */
const Template = (args) => (
  <IconButton {...args}>
    <LocalActivityIcon />
  </IconButton>
)

/* Variants */
export const Basic = Template.bind({})
Basic.args = {}

export const Tooltip = Template.bind({})
Tooltip.args = { tooltip: 'Tooltip Content' }

export const Colors = Template.bind({})
Colors.args = { color: 'primary' }