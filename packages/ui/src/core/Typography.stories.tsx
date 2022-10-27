import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle'
import React from 'react'
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
  component: Typography,
  args: {
    children: 'Label',
  },
  argTypes: {
    spacing: {
      control: { type: 'number' },
    },
    align: {
      options: aligns,
      control: { type: 'select' },
    },
    variant: {
      options: variants,
      control: { type: 'select' },
    },
  },
}

/* Template */
const Template = (args) => <Typography {...args} />

/* Variants */
export const Basic = Template.bind({})
export const Icon = Template.bind({})
Icon.args = {
  startIcon: <LocalShippingIcon />,
  endIcon: <PersonPinCircleIcon />,
}
