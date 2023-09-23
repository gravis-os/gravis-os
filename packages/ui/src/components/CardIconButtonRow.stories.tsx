import React from 'react'

import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward'
import AddReactionIcon from '@mui/icons-material/AddReaction'
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload'

import { getComponentStorybookTitle } from '../utils/getStorybookTitle'
import CardIconButtonRow from './CardIconButtonRow'

/* Constants */
const items = [
  { title: 'Button 1', icon: <AccessibleForwardIcon /> },
  { title: 'Button 2', icon: <AddReactionIcon /> },
  { title: 'Button 3', icon: <AssuredWorkloadIcon /> },
]
export default {
  title: getComponentStorybookTitle(CardIconButtonRow.name),
  args: { disableLastGutterBottom: true, items },
  component: CardIconButtonRow,
}

/* Template */
const Template = (args) => <CardIconButtonRow {...args} />

/* Variants */
export const Basic = Template.bind({})
