import React from 'react'

import TramSharpIcon from '@mui/icons-material/TramSharp'

import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import MoreIconButton from './MoreIconButton'

/* Constants */
const sizes = ['small', 'medium', 'large']
const orientations = ['horizontal', 'vertical']
export default {
  title: getCoreStorybookTitle(MoreIconButton.name),
  args: {
    items: [
      {
        icon: <TramSharpIcon />,
        key: 'item1',
        label: 'Item 1',
        value: 'item1',
      },
      {
        icon: <TramSharpIcon />,
        key: 'item2',
        label: 'Item 2',
        value: 'item2',
      },
      {
        icon: <TramSharpIcon />,
        key: 'item3',
        label: 'Item 3',
        value: 'item3',
      },
    ],
    size: 'medium',
  },
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: orientations,
    },
    size: {
      control: { type: 'select' },
      options: sizes,
    },
  },
  component: MoreIconButton,
}

/* Template */
const Template = (args) => <MoreIconButton {...args} />

/* Variants */
export const Basic = Template.bind({})
Basic.args = {}

export const Horizontal = Template.bind({})
Horizontal.args = {
  orientation: 'horizontal',
}
