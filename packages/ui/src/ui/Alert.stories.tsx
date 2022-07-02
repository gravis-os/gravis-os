import React from 'react'
import Alert from './Alert'
import Stack from './Stack'

export default {
  title: 'ui/Alert',
  component: Alert,
  args: { children: 'Label' },
}

const Template = (args) => <Alert {...args} />

export const Basic = Template.bind({})
Basic.args = {}

export const Contained = Template.bind({})
Contained.args = { variant: 'contained' }

export const ContainedAllColors = (args) => (
  <Stack spacing={1}>
    <Alert {...args} />
    <Alert color="success" {...args} />
    <Alert color="error" {...args} />
    <Alert color="info" {...args} />
    <Alert color="warning" {...args} />
  </Stack>
)
ContainedAllColors.args = { ...Contained.args }

export const Outlined = Template.bind({})
Outlined.args = { variant: 'outlined' }

export const OutlinedAllColors = (args) => (
  <Stack spacing={1}>
    <Alert {...args} />
    <Alert color="success" {...args} />
    <Alert color="error" {...args} />
    <Alert color="info" {...args} />
    <Alert color="warning" {...args} />
  </Stack>
)
OutlinedAllColors.args = { ...Outlined.args }
