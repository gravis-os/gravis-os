import React from 'react'

import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import Box from './Box'

export default {
  title: getCoreStorybookTitle('Box'),
  args: {
    center: true,
    children: 'Title',
    py: 10,
    reveal: true,
    sx: { backgroundColor: 'common.white' },
  },
  component: Box,
  parameters: { layout: 'fullscreen' },
}

const Template = (args) => <Box {...args} />

export const Basic = Template.bind({})
Basic.args = {}
