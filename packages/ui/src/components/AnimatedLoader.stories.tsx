import React from 'react'

import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import AnimatedLoader from './AnimatedLoader'

export default {
  title: getCoreStorybookTitle(AnimatedLoader.name),
  args: { children: 'Loading...' },
  component: AnimatedLoader,
}

const Template = (args) => <AnimatedLoader {...args} />

export const Basic = Template.bind({})
Basic.args = {}
