import React from 'react'
import { MOCK_SUB_HEADER_PROPS } from '../../mocks'
import { getCoreStorybookTitle } from '../../utils/getStorybookTitle'
import SubHeader from './SubHeader'

export default {
  title: getCoreStorybookTitle(SubHeader.name),
  component: SubHeader,
  parameters: { layout: 'fullscreen' },
  args: MOCK_SUB_HEADER_PROPS,
}

const Template = (args) => <SubHeader {...args} />

export const Basic = Template.bind({})
Basic.args = {}
