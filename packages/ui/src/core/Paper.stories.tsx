import React from 'react'
import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import Box from './Box'
import Paper from './Paper'

/* Constants */
const variants = ['elevation', 'outlined', 'string']
export default {
  title: getCoreStorybookTitle(Paper.name),
  component: Paper,
  args: {
    children: 'Label',
    square: false,
    variant: 'elevation',
  },
  argTypes: {
    variant: {
      options: variants,
      control: { type: 'select' },
    },
    square: {
      control: { type: 'boolean' },
    },
    elevation: {
      control: { type: 'number' },
    },
  },
}

/* Template */
const Template = (args) => {
  const { children } = args
  return (
    <Paper {...args}>
      <Box display="flex" justifyContent="center" p={3}>
        {children}
      </Box>
    </Paper>
  )
}

/* Variants */
export const Basic = Template.bind({})
Basic.args = {}

export const Elevation = Template.bind({})
Elevation.args = {
  elevation: 2,
}

export const Outlined = Template.bind({})
Outlined.args = {
  variant: 'outlined',
}

export const Square = Template.bind({})
Square.args = {
  square: true,
}
