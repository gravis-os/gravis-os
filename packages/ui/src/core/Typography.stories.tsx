import React from 'react'

import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle'

import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import Typography from './Typography'

/* Constants */
const aligns = ['inherit', 'left', 'center', 'right', 'justify']
const variants = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'subtitle1',
  'subtitle2',
  'body1',
  'body2',
  'inherit',
]
export default {
  title: getCoreStorybookTitle(Typography.name),
  args: {
    children: 'Label',
  },
  argTypes: {
    align: {
      control: { type: 'select' },
      options: aligns,
    },
    spacing: {
      control: { type: 'number' },
    },
    variant: {
      control: { type: 'select' },
      options: variants,
    },
  },
  component: Typography,
}

/* Template */
const Template = (args) => <Typography {...args} />

/* Variants */
export const Basic = Template.bind({})
export const Icon = Template.bind({})
Icon.args = {
  endIcon: <PersonPinCircleIcon />,
  startIcon: <LocalShippingIcon />,
}
