import BrushIcon from '@mui/icons-material/Brush'
import BuildIcon from '@mui/icons-material/Build'
import { drop, first } from 'lodash'
import React from 'react'
import { getComponentStorybookTitle } from '../utils/getStorybookTitle'
import IconProgressBar, { IconProgressBarItemStatus } from './IconProgressBar'

/* Constants */
const items = [
  {
    title: 'Begin',
    icon: <BrushIcon />,
  },
  { title: 'End', icon: <BuildIcon /> },
]
export default {
  title: getComponentStorybookTitle(IconProgressBar.name),
  component: IconProgressBar,
  args: { items },
}

/* Template */
const Template = (args) => <IconProgressBar {...args} />

/* Variants */
export const Basic = Template.bind({})
export const CurrentStep = Template.bind({})
CurrentStep.args = {
  items: [
    { ...first(items), status: IconProgressBarItemStatus.Current },
    ...drop(items),
  ],
}
export const CompletedStep = Template.bind({})
CompletedStep.args = {
  items: [
    { ...first(items), status: IconProgressBarItemStatus.Completed },
    ...drop(items),
  ],
}
