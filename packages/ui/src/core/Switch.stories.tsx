import React from 'react'
import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import Switch from './Switch'

/* Constants */
export default {
  title: getCoreStorybookTitle(Switch.name),
  component: Switch,
  args: {},
}

/* Template */
const Template = (args) => <Switch {...args} />

/* Variants */
export const Basic = Template.bind({})
