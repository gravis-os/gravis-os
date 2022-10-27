import React from 'react'
import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import Breadcrumbs from './Breadcrumbs'

/* Constants */
export default {
  title: getCoreStorybookTitle(Breadcrumbs.name),
  component: Breadcrumbs,
  args: {
    items: [
      {
        key: 'trail1',
        title: 'Trail 1',
        href: '/',
      },
      {
        key: 'trail2',
        title: 'Trail 2',
        href: '/',
      },
    ],
  },
}

/* Template */
const Template = (args) => <Breadcrumbs {...args} />

/* Variants */
export const Basic = Template.bind({})
Basic.args = {}
