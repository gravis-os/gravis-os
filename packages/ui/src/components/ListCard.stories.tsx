import React from 'react'

import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import map from 'lodash/map'

import { getComponentStorybookTitle } from '../utils/getStorybookTitle'
import ListCard from './ListCard'

/* Constants */
const items = map(Array.from({ length: 4 }), (item, index) => ({
  title: `List Card ${index}`,
  disableArrow: false,
  key: `list-card-item-${index}`,
}))
export default {
  title: getComponentStorybookTitle(ListCard.name),
  args: { title: 'List Card', items },
  component: ListCard,
}

/* Template */
const Template = (args) => <ListCard {...args} />

/* Variants */
export const Basic = Template.bind({})
export const Icon = Template.bind({})
Icon.args = {
  items: map(items, (item) => ({
    ...item,
    icon: <BusinessCenterIcon color="success" />,
  })),
}
