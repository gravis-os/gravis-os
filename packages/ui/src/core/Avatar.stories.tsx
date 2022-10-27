import React from 'react'
import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import Avatar from './Avatar'

/* Default */
const variants = ['square', 'rounded', 'circular']

export default {
  title: getCoreStorybookTitle(Avatar.name),
  component: Avatar,
  args: { size: 100, variant: 'square' },
  argTypes: {
    variant: {
      options: variants,
      control: { type: 'select' },
    },
  },
}

/* Template */
const Template = (args) => <Avatar {...args} />

/* Variants */
export const Basic = Template.bind({})
Basic.args = { src: 'https://i.pravatar.cc/500?img=3' }

export const Letter = Template.bind({})
Letter.args = { children: 'RT' }
