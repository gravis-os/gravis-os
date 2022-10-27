import React from 'react'
import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import CircularProgress from './CircularProgress'

/* Constants */
export default {
  title: getCoreStorybookTitle(CircularProgress.name),
  component: CircularProgress,
}

/* Template */
const Template = (args) => <CircularProgress {...args} />

/* Variants */
export const Basic = Template.bind({})
Basic.args = {}

export const Fullscreen = Template.bind({})
Fullscreen.args = { fullScreen: true }
