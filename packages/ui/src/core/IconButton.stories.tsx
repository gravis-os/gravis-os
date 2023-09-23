import React from 'react'

import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined'

import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import IconButton from './IconButton'

/* Constants */
const colors = ['primary', 'secondary', 'success', 'error', 'info', 'warning']
export default {
  title: getCoreStorybookTitle(IconButton.name),
  args: {},
  argTypes: {
    color: {
      control: { type: 'select' },
      options: colors,
    },
    tooltip: {
      control: { type: 'text' },
    },
  },
  component: IconButton,
}

/* Template */
const Template = (args) => (
  <IconButton {...args}>
    <LocalActivityOutlinedIcon />
  </IconButton>
)

/* Variants */
export const Basic = Template.bind({})
Basic.args = {}

export const Tooltip = Template.bind({})
Tooltip.args = { tooltip: 'Tooltip Content' }

export const Colors = Template.bind({})
Colors.args = { color: 'primary' }
