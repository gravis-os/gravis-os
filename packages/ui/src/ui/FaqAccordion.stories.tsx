import React from 'react'
import FaqAccordion from './FaqAccordion'
import { MOCK_FAQ_ACCORDION_ITEMS } from '../mocks'

export default {
  title: 'ui/FaqAccordion',
  component: FaqAccordion,
  args: { items: MOCK_FAQ_ACCORDION_ITEMS },
}

const Template = (args) => <FaqAccordion {...args} />

export const Basic = Template.bind({})
Basic.args = {}
