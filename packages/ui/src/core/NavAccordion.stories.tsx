import React from 'react'
import { MOCK_NAV_ACCORDION_ITEMS } from '../mocks'
import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import NavAccordion from './NavAccordion'

export default {
  title: getCoreStorybookTitle(NavAccordion.name),
  component: NavAccordion,
  args: { title: 'Title', items: MOCK_NAV_ACCORDION_ITEMS },
}

const Template = (args) => <NavAccordion {...args} />

export const Basic = Template.bind({})
Basic.args = {}
