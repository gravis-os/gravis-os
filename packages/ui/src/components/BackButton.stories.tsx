import * as React from 'react'

import { getComponentStorybookTitle } from '../utils/getStorybookTitle'
import BackButton from './BackButton'

/* Constants */
export default {
  title: getComponentStorybookTitle(BackButton.name),
  args: {
    title: 'Label',
  },
  argTypes: {
    disableArrow: {
      control: { type: 'boolean' },
    },
  },
  component: BackButton,
}

/* Template */
const Template = (args) => <BackButton {...args} />

/* Variants */
export const Basic = Template.bind({})
export const NoArrow = Template.bind({})
NoArrow.args = { disableArrow: true }
