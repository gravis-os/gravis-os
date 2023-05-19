import kebabCase from 'lodash/kebabCase'
import map from 'lodash/map'
import startCase from 'lodash/startCase'
import React from 'react'
import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import StatStack from './StatStack'

/* Constants */
const items = map(['item 1', 'item 2', 'item 3'], (item) => ({
  key: kebabCase(item),
  title: startCase(item),
  overline: startCase(item),
}))
const sizes = ['small', 'middle', 'large']
const variants = ['contained', 'outlined']
export default {
  title: getCoreStorybookTitle(StatStack.name),
  component: StatStack,
  args: {
    items,
  },
  argTypes: {
    size: {
      options: sizes,
      control: { type: 'select' },
    },
    variant: {
      options: variants,
      control: { type: 'select' },
    },
    reverse: {
      control: { type: 'boolean' },
    },
  },
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
