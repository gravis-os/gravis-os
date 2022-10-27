import TramSharpIcon from '@mui/icons-material/TramSharp'
import React from 'react'
import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import MoreIconButton from './MoreIconButton'

/* Constants */
const sizes = ['small', 'medium', 'large']
const orientations = ['horizontal', 'vertical']
export default {
  title: getCoreStorybookTitle(MoreIconButton.name),
  component: MoreIconButton,
  args: {
    items: [
      {
        key: 'item1',
        value: 'item1',
        label: 'Item 1',
        icon: <TramSharpIcon />,
      },
      {
        key: 'item2',
        value: 'item2',
        label: 'Item 2',
        icon: <TramSharpIcon />,
      },
      {
        key: 'item3',
        value: 'item3',
        label: 'Item 3',
        icon: <TramSharpIcon />,
      },
    ],
    size: 'medium',
  },
  argTypes: {
    size: {
      options: sizes,
      control: { type: 'select' },
    },
    orientation: {
      options: orientations,
      control: { type: 'select' },
    },
  },
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
