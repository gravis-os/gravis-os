import React from 'react'

import { MOCK_SUB_HEADER_PROPS } from '../../mocks'
import { getCoreStorybookTitle } from '../../utils/getStorybookTitle'
import SubHeader from './SubHeader'

export default {
  title: getCoreStorybookTitle(SubHeader.name),
  args: MOCK_SUB_HEADER_PROPS,
  component: SubHeader,
  parameters: { layout: 'fullscreen' },
}

const Template = (args) => <SubHeader {...args} />

export const Basic = Template.bind({})
Basic.args = {}
