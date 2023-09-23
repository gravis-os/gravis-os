import React from 'react'

import kebabCase from 'lodash/kebabCase'
import map from 'lodash/map'
import startCase from 'lodash/startCase'

import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import StatStack from './StatStack'

/* Constants */
const items = map(['item 1', 'item 2', 'item 3'], (item) => ({
  title: startCase(item),
  key: kebabCase(item),
  overline: startCase(item),
}))
const sizes = ['small', 'middle', 'large']
const variants = ['contained', 'outlined']
export default {
  title: getCoreStorybookTitle(StatStack.name),
  args: {
    items,
  },
  argTypes: {
    reverse: {
      control: { type: 'boolean' },
    },
    size: {
      control: { type: 'select' },
      options: sizes,
    },
    variant: {
      control: { type: 'select' },
      options: variants,
    },
  },
  component: StatStack,
}

/* Template */
const Template = (args) => <StatStack {...args} />

/* Variants */
export const Basic = Template.bind({})
export const Subtitle = Template.bind({})
Subtitle.args = {
  items: map(items, (item) => ({ ...item, subtitle: item.title })),
}
export const Reverse = Template.bind({})
Reverse.args = {
  ...Subtitle.args,
  reverse: true,
}
