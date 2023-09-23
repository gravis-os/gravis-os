import React from 'react'

import { Button, Stack } from '../core'
import { getComponentStorybookTitle } from '../utils/getStorybookTitle'
import ActionFooter from './ActionFooter'

/* Constants */
const actions = [
  <Button color="secondary" title="Contained" variant="contained" />,
]
export default {
  title: getComponentStorybookTitle(ActionFooter.name),
  args: { actions },
  component: ActionFooter,
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
      color="secondary"
      fullWidth
      title="Full Width"
      variant="contained"
    />,
  ],
}
export const Multiple = Template.bind({})
Multiple.args = {
  actions: [
    <Button color="primary" title="Muted" variant="muted" />,
    <Button color="secondary" title="contained" variant="contained" />,
  ],
}
