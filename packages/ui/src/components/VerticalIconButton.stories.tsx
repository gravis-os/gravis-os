import BuildIcon from '@mui/icons-material/Build'
import React from 'react'
import { getComponentStorybookTitle } from '../utils/getStorybookTitle'
import VerticalIconButton from './VerticalIconButton'

/* Constants */
export default {
  title: getComponentStorybookTitle(VerticalIconButton.name),
  component: VerticalIconButton,
  args: {
    title: 'Label',
    icon: <BuildIcon />,
  },
}

/* Template */
const Template = (args) => <VerticalIconButton {...args} />

/* Variants */
export const Basic = Template.bind({})
