import React from 'react'

import LocalShippingIcon from '@mui/icons-material/LocalShipping'

import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import IconButton from './IconButton'
import Tooltip from './Tooltip'

/* Constants */
export default {
  title: getCoreStorybookTitle(Tooltip.name),
  args: {
    title: 'Label',
  },
  component: Tooltip,
}

/* Template */
const Template = (args) => (
  <Tooltip {...args}>
    <IconButton>
      <LocalShippingIcon />
    </IconButton>
  </Tooltip>
)

/* Variants */
export const Basic = Template.bind({})
