import React from 'react'
import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import SplitButton from './SplitButton'

/* Constants */
const options = [{ label: 'Label 1' }, { label: 'Label 2' }]
export default {
  title: getCoreStorybookTitle(SplitButton.name),
  component: SplitButton,
  args: {
    options,
  },
}

/* Template */
const Template = (args) => <SplitButton {...args} />

/* Variants */
export const Basic = Template.bind({})
Basic.args = {}

export const Disabled = Template.bind({})
Disabled.args = { options: [...options, { label: 'Disabled', disabled: true }] }
