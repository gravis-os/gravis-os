import React from 'react'
import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import RadioGroup from './RadioGroup'

/* Constants */
export default {
  title: getCoreStorybookTitle(RadioGroup.name),
  component: RadioGroup,
  args: {
    name: 'Label',
    options: ['Option 1', 'Option 2'],
  },
}

/* Template */
const Template = (args) => {
  return <RadioGroup {...args} />
}

/* Variants */
export const Basic = Template.bind({})
Basic.args = {}
