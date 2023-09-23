import React from 'react'

import BuildIcon from '@mui/icons-material/Build'

import { getComponentStorybookTitle } from '../utils/getStorybookTitle'
import VerticalIconButton from './VerticalIconButton'

/* Constants */
export default {
  title: getComponentStorybookTitle(VerticalIconButton.name),
  args: {
    title: 'Label',
    icon: <BuildIcon />,
  },
  component: VerticalIconButton,
}

/* Template */
const Template = (args) => <VerticalIconButton {...args} />

/* Variants */
export const Basic = Template.bind({})
