import React from 'react'
import ConfirmationDialog from './ConfirmationDialog'

export default {
  title: 'ui/ConfirmationDialog',
  component: ConfirmationDialog,
  args: { children: 'Label' },
}

const Template = (args) => <ConfirmationDialog {...args} />

export const Basic = Template.bind({})
Basic.args = {}
