import React from 'react'

import isEqual from 'lodash/isEqual'

import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import Divider from './Divider'
import Stack from './Stack'
import Typography from './Typography'

/* Constants */
const orientations = ['vertical', 'horizontal']
export default {
  title: getCoreStorybookTitle(Divider.name),
  args: {
    children: 'Divider',
    orientation: 'horizontal',
  },
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: orientations,
    },
  },
  component: Divider,
}

/* Template */
const Template = (args) => {
  const { orientation } = args
  return (
    <Stack
      direction={isEqual(orientation, 'vertical') ? 'row' : 'column'}
      spacing={1}
    >
      <Typography>Top Text</Typography>
      <Divider {...args} />
      <Typography>Bottom Text</Typography>
    </Stack>
  )
}

/* Variants */
export const Basic = Template.bind({})
Basic.args = {}
