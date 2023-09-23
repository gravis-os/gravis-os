import React from 'react'

import { MOCK_FAQ_ACCORDION_ITEMS } from '../mocks'
import getStorybookTitle from '../utils/getStorybookTitle'
import FaqAccordion from './FaqAccordion'

export default {
  title: getStorybookTitle(FaqAccordion.displayName),
  args: { items: MOCK_FAQ_ACCORDION_ITEMS },
  component: FaqAccordion,
}

const Template = (args) => <FaqAccordion {...args} />

export const Basic = Template.bind({})
Basic.args = {}
