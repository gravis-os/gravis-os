import React from 'react'
import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import Box from './Box'

export default {
  title: getCoreStorybookTitle('Box'),
  component: Box,
  parameters: { layout: 'fullscreen' },
  args: {
    children: 'Title',
    reveal: true,
    center: true,
    py: 10,
    sx: { backgroundColor: 'common.white' },
  },
}

const Template = (args) => <Box {...args} />

export const Basic = Template.bind({})
Basic.args = {}
