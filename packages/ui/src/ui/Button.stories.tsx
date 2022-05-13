import React from 'react'
import Button from './Button'
import Stack from './Stack'

export default {
  title: 'ui/Button',
  component: Button,
  args: { children: 'Label' },
}

const Template = args => <Button {...args} />

export const Basic = Template.bind({})
Basic.args = {}

export const Contained = Template.bind({})
Contained.args = { variant: 'contained' }

export const ContainedAllColors = args => (
  <Stack direction="row" alignItems="center" spacing={1}>
    <Button {...args} />
    <Button color="primary" {...args} />
    <Button color="secondary" {...args} />
    <Button color="success" {...args} />
    <Button color="error" {...args} />
    <Button color="info" {...args} />
    <Button color="warning" {...args} />
  </Stack>
)
ContainedAllColors.args = { ...Contained.args }

export const Outlined = Template.bind({})
Outlined.args = { variant: 'outlined' }

export const OutlinedAllColors = args => (
  <Stack direction="row" alignItems="center" spacing={1}>
    <Button {...args} />
    <Button color="primary" {...args} />
    <Button color="secondary" {...args} />
    <Button color="success" {...args} />
    <Button color="error" {...args} />
    <Button color="info" {...args} />
    <Button color="warning" {...args} />
  </Stack>
)
OutlinedAllColors.args = { ...Outlined.args }
