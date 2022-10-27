import React from 'react'
import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import Html from './Html'

/* Constants */
export default {
  title: getCoreStorybookTitle(Html.name),
  component: Html,
  args: {
    html: '<b>Html Content</b>',
  },
}

/* Template */
const Template = (args) => <Html {...args} />

/* Variants */
export const Basic = Template.bind({})
Basic.args = {}
