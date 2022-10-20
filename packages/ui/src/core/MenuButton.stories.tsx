import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket'
import React from 'react'
import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import MenuButton from './MenuButton'

/* Constants */
const colors = ['primary', 'secondary', 'success', 'error', 'info', 'warning']
export default {
  title: getCoreStorybookTitle(MenuButton.name),
  component: MenuButton,
  args: {
    title: 'Menu',
    items: [
      {
        key: 'item1',
        value: 'item1',
        label: 'Item 1',
        icon: <AirplaneTicketIcon />,
      },
      {
        key: 'item2',
        value: 'item2',
        label: 'Item 2',
        icon: <AirplaneTicketIcon />,
      },
      {
        key: 'item3',
        value: 'item3',
        label: 'Item 3',
        icon: <AirplaneTicketIcon />,
      },
    ],
  },
}

/* Template */
const Template = (args) => <MenuButton {...args} />

/* Variants */
export const Basic = Template.bind({})
Basic.args = {}
