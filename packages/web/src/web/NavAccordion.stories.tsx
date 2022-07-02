import React from 'react'
import NavAccordion from './NavAccordion'
import { MOCK_NAV_ACCORDION_ITEMS } from '../mocks'

export default {
  component: NavAccordion,
  args: { title: 'Title', items: MOCK_NAV_ACCORDION_ITEMS },
}

const Template = (args) => <NavAccordion {...args} />

export const Basic = Template.bind({})
Basic.args = {}
