import React from 'react'

import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'

import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import ConfirmationDialog from './ConfirmationDialog'

/* Constants */
export default {
  title: getCoreStorybookTitle(ConfirmationDialog.name),
  args: { children: 'Label', tooltip: 'Delete' },
  component: ConfirmationDialog,
}

/* Template */
const Template = (args) => <ConfirmationDialog {...args} />

/* Variants */
export const Basic = Template.bind({})
Basic.args = {}

export const CustomIcon = Template.bind({})
CustomIcon.args = { icon: <LocalShippingOutlinedIcon /> }
