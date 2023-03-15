import React from 'react'
import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import Image from './Image'

/* Constants */
export default {
  title: getCoreStorybookTitle(Image.name),
  component: Image,
  args: {
    src: 'https://i.pravatar.cc/500?img=12',
  },
  argTypes: {
    loading: {
      table: {
        disable: true,
      },
    },
  },
}

/* Template */
const Template = (args) => <Image {...args} />

/* Variants */
export const Basic = Template.bind({})
Basic.args = {}

export const FixedSize = Template.bind({})
FixedSize.args = {
  height: 100,
  width: 100,
  loading: false,
}
