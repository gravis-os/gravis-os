import React from 'react'
import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import ConfirmationDialog from './ConfirmationDialog'

export default {
  title: getCoreStorybookTitle(ConfirmationDialog.name),
  component: ConfirmationDialog,
  args: { children: 'Label' },
}

const Template = (args) => <ConfirmationDialog {...args} />

export const Basic = Template.bind({})
Basic.args = {}
