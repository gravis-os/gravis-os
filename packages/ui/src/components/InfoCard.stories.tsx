import React from 'react'

import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'

import { getComponentStorybookTitle } from '../utils/getStorybookTitle'
import InfoCard from './InfoCard'

/* Constants */
const items = [
  { title: 'Item 1', description: 'Description of Item 1' },
  { title: 'Item 2', description: 'Description of Item 2' },
]
export default {
  title: getComponentStorybookTitle(InfoCard.name),
  args: {
    title: 'Info Card',
    items,
    key: 'info-card-key',
  },
  component: InfoCard,
}

/* Template */
const Template = (args) => <InfoCard {...args} />

/* Variants */
export const Basic = Template.bind({})
export const Chip = Template.bind({})
Chip.args = { chip: 'Chip' }
export const Icon = Template.bind({})
Icon.args = { ...Chip.args, icon: <BusinessCenterIcon /> }
