import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import { map } from 'lodash'
import React from 'react'
import { getComponentStorybookTitle } from '../utils/getStorybookTitle'
import ListCard from './ListCard'

/* Constants */
const items = map(Array(4), (item, index) => ({
  key: `list-card-item-${index}`,
  title: `List Card ${index}`,
  disableArrow: false,
}))
export default {
  title: getComponentStorybookTitle(ListCard.name),
  component: ListCard,
  args: { title: 'List Card', items },
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
