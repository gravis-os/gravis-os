import React from 'react'

import map from 'lodash/map'

import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import Stack from './Stack'
import Typography from './Typography'

/* Constants */
const directions = ['column', 'row']
export default {
  title: getCoreStorybookTitle(Stack.name),
  args: {
    children: ['Item 1', 'Item 2', 'Item 3'],
    spacing: 2,
  },
  argTypes: {
    direction: {
      control: { type: 'select' },
      options: directions,
    },
  },
  component: Stack,
}

/* Template */
const Template = (args) => {
  const { children } = args
  return (
    <Stack {...args}>
      {map(children, (children) => (
        <Typography>{children}</Typography>
      ))}
    </Stack>
  )
}

/* Variants */
export const Basic = Template.bind({})
export const Row = Template.bind({})
Row.args = { direction: 'row' }
export const Center = Template.bind({})
Center.args = { center: true }
