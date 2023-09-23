import React from 'react'

import LocalAirportIcon from '@mui/icons-material/LocalAirport'

import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import Logo from './Logo'

/* Constants */
export default {
  title: getCoreStorybookTitle(Logo.name),
  args: {
    title: 'Label',
    spacing: 1,
  },
  argTypes: {
    emblem: {
      control: { type: 'object' },
    },
    wordmark: {
      control: { type: 'text' },
    },
  },
  component: Logo,
}

/* Template */
const Template = (args) => <Logo {...args} href={undefined} />

/* Variants */
export const Basic = Template.bind({})
Basic.args = {}

export const Emblem = Template.bind({})
Emblem.args = {
  emblem: <LocalAirportIcon />,
}

export const WordMark = Template.bind({})
WordMark.args = {
  emblem: <LocalAirportIcon />,
  wordmark: 'Word',
}
