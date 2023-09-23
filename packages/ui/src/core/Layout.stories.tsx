import React from 'react'

import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import Layout from './Layout'

/* Constants */
export default {
  title: getCoreStorybookTitle(Layout.name),
  args: {
    children: 'Label',
  },
  component: Layout,
}

/* Template */
const Template = (args) => <Layout {...args} />

/* Variants */
export const Basic = Template.bind({})
Basic.args = {}
