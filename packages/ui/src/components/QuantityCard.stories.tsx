import React from 'react'
import { getComponentStorybookTitle } from '../utils/getStorybookTitle'
import QuantityCard from './QuantityCard'

/* Constants */
export default {
  title: getComponentStorybookTitle(QuantityCard.name),
  component: QuantityCard,
  args: {
    title: 'Quantity Card',
    quantity: 25,
  },
}

/* Template */
const Template = (args) => <QuantityCard {...args} />

/* Variants */
export const Basic = Template.bind({})
export const Subtitle = Template.bind({})
Subtitle.args = { subtitle: 'Quantity Card Subtitle' }
export const Description = Template.bind({})
Description.args = {
  ...Subtitle.args,
  description: 'Description of Quantity Card',
}
export const Image = Template.bind({})
Image.args = {
  ...Description.args,
  imageSrc: 'https://i.pravatar.cc/400?img=25',
}
