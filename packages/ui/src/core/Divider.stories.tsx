import isEqual from 'lodash/isEqual'
import React from 'react'
import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import Divider from './Divider'
import Stack from './Stack'
import Typography from './Typography'

/* Constants */
const orientations = ['vertical', 'horizontal']
export default {
  title: getCoreStorybookTitle(Divider.name),
  component: Divider,
  args: {
    orientation: 'horizontal',
    children: 'Divider',
  },
  argTypes: {
    orientation: {
      options: orientations,
      control: { type: 'select' },
    },
  },
}

/* Template */
const Template = (args) => {
  const { orientation } = args
  return (
    <Stack
      spacing={1}
      direction={isEqual(orientation, 'vertical') ? 'row' : 'column'}
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
