import React from 'react'

import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket'

import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import MenuButton from './MenuButton'

/* Constants */
const colors = ['primary', 'secondary', 'success', 'error', 'info', 'warning']
export default {
  title: getCoreStorybookTitle(MenuButton.name),
  args: {
    title: 'Menu',
    items: [
      {
        icon: <AirplaneTicketIcon />,
        key: 'item1',
        label: 'Item 1',
        value: 'item1',
      },
      {
        icon: <AirplaneTicketIcon />,
        key: 'item2',
        label: 'Item 2',
        value: 'item2',
      },
      {
        icon: <AirplaneTicketIcon />,
        key: 'item3',
        label: 'Item 3',
        value: 'item3',
      },
    ],
  },
  component: MenuButton,
}

/* Template */
const Template = (args) => <MenuButton {...args} />

/* Variants */
export const Basic = Template.bind({})
Basic.args = {}
