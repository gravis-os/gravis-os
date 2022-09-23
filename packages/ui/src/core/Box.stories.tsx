import React from 'react'
import Box from './Box'

export default {
  title: 'ui/Box',
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
