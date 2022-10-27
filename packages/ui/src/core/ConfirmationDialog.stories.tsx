import { LocalShipping as LocalShippingIcon } from '@mui/icons-material'
import React from 'react'
import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import ConfirmationDialog from './ConfirmationDialog'

/* Constants */
export default {
  title: getCoreStorybookTitle(ConfirmationDialog.name),
  component: ConfirmationDialog,
  args: { children: 'Label', tooltip: 'Delete' },
}

/* Template */
const Template = (args) => <ConfirmationDialog {...args} />

/* Variants */
export const Basic = Template.bind({})
Basic.args = {}

export const CustomIcon = Template.bind({})
CustomIcon.args = { icon: <LocalShippingIcon /> }
