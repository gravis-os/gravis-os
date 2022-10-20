import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import React from 'react'
import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import IconButton from './IconButton'
import Tooltip from './Tooltip'

/* Constants */
export default {
  title: getCoreStorybookTitle(Tooltip.name),
  component: Tooltip,
  args: {
    title: 'Label',
  },
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
