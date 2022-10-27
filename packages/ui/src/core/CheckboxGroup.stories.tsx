import React from 'react'
import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import CheckboxGroup from './CheckboxGroup'

/* Default */
export default {
  title: getCoreStorybookTitle(CheckboxGroup.name),
  component: CheckboxGroup,
  args: {
    name: 'Label',
    disableLabel: false,
    items: [
      { key: 'item1', value: 'item1', label: 'Item 1' },
      { key: 'item2', value: 'item2', label: 'Item 2' },
      { key: 'item3', value: 'item3', label: 'Item 3' },
    ],
  },
}

/* Template */
const Template = (args) => <CheckboxGroup {...args} />

/* Variants */
export const Basic = Template.bind({})
Basic.args = {}

export const Labelled = Template.bind({})
Labelled.args = { label: 'Custom Label', disableLabel: false }
