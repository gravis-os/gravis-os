import React from 'react'
import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import Container from './Container'

/* Constants */
export default {
  title: getCoreStorybookTitle(Container.name),
  component: Container,
  args: { children: 'Label' },
}

/* Template */
const Template = (args) => <Container {...args} />

/* Variants */
export const Basic = Template.bind({})
Basic.args = {}

export const DisabledGutters = Template.bind({})
DisabledGutters.args = { disableGutters: true }
