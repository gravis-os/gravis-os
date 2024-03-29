import React from 'react'

import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import Skeleton from './Skeleton'

/* Constants */
const variants = ['text', 'circular', 'rectangular', 'rounded']
const animations = ['wave', 'default']
export default {
  title: getCoreStorybookTitle(Skeleton.name),
  args: {
    height: 100,
    variant: 'text',
    width: 100,
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: variants,
    },
  },
  component: Skeleton,
}

/* Template */
const Template = (args) => <Skeleton {...args} />

/* Variants */
export const Basic = Template.bind({})
Basic.args = {}

export const Circular = Template.bind({})
Circular.args = { variant: 'circular' }

export const Rectangular = Template.bind({})
Rectangular.args = { variant: 'rectangular' }

export const Rounded = Template.bind({})
Rounded.args = { variant: 'rounded' }

export const Wave = Template.bind({})
Wave.args = { animation: 'wave' }

export const NoAnimation = Template.bind({})
NoAnimation.args = { animation: false }
NoAnimation.argTypes = {
  animation: {
    control: { type: 'boolean' },
  },
}
