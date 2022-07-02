import React from 'react'
import SubHeader from './SubHeader'
import { MOCK_SUB_HEADER_PROPS } from '../../mocks'

export default {
  title: 'Components/SubHeader',
  component: SubHeader,
  parameters: { layout: 'fullscreen' },
  args: MOCK_SUB_HEADER_PROPS,
}

const Template = (args) => <SubHeader {...args} />

export const Basic = Template.bind({})
Basic.args = {}
