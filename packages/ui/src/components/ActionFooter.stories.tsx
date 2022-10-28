import React from 'react'
import { Button, Stack } from '../core'
import { getComponentStorybookTitle } from '../utils/getStorybookTitle'
import ActionFooter from './ActionFooter'

/* Constants */
const actions = [
  <Button variant="contained" title="Contained" color="secondary" />,
]
export default {
  title: getComponentStorybookTitle(ActionFooter.name),
  component: ActionFooter,
  args: { actions },
  parameters: {
    layout: 'fullscreen',
  },
}

/* Template */
const Template = (args) => (
  <Stack>
    <ActionFooter {...args} />
  </Stack>
)

/* Variants */
export const Basic = Template.bind({})
export const FullWidth = Template.bind({})
FullWidth.args = {
  actions: [
    <Button
      variant="contained"
      title="Full Width"
      color="secondary"
      fullWidth
    />,
  ],
}
export const Multiple = Template.bind({})
Multiple.args = {
  actions: [
    <Button variant="muted" title="Muted" color="primary" />,
    <Button variant="contained" title="contained" color="secondary" />,
  ],
}
