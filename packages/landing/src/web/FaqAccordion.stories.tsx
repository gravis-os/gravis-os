import React from 'react'
import { MOCK_FAQ_ACCORDION_ITEMS } from '../mocks'
import getStorybookTitle from '../server/getStorybookTitle'
import FaqAccordion from './FaqAccordion'

export default {
  component: FaqAccordion,
  title: getStorybookTitle(FaqAccordion.displayName),
  args: { items: MOCK_FAQ_ACCORDION_ITEMS },
}

const Template = (args) => <FaqAccordion {...args} />

export const Basic = Template.bind({})
Basic.args = {}
