import React from 'react'
import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import Badge from './Badge'
import Button from './Button'
import Stack from './Stack'

export default {
  title: getCoreStorybookTitle(Badge.name),
  component: Badge,
  args: {
    children: <Button variant="contained">Label</Button>,
    badgeContent: '99+',
  },
}

const Template = (args) => <Badge {...args} />

export const Contained = Template.bind({})
Contained.args = { variant: 'contained' }

export const ContainedAllColors = (args) => (
  <Stack direction="row" alignItems="center" spacing={1}>
    <Badge {...args} />
    <Badge color="primary" {...args} />
    <Badge color="secondary" {...args} />
    <Badge color="success" {...args} />
    <Badge color="error" {...args} />
    <Badge color="info" {...args} />
    <Badge color="warning" {...args} />
  </Stack>
)
ContainedAllColors.args = { ...Contained.args }
