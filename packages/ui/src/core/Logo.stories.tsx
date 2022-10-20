import LocalAirportIcon from '@mui/icons-material/LocalAirport'
import React from 'react'
import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import Logo from './Logo'

/* Constants */
export default {
  title: getCoreStorybookTitle(Logo.name),
  component: Logo,
  args: {
    title: 'Label',
    spacing: 1,
  },
  argTypes: {
    wordmark: {
      control: { type: 'text' },
    },
    emblem: {
      control: { type: 'object' },
    },
  },
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
  wordmark: 'Word',
  emblem: <LocalAirportIcon />,
}
