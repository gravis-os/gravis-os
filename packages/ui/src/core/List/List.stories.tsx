import React from 'react'
import { MOCK_LIST_ITEMS, MOCK_NESTED_LIST_ITEMS } from '../../mocks'
import { getCoreStorybookTitle } from '../../utils/getStorybookTitle'
import List from './List'

export default {
  title: getCoreStorybookTitle(List.name),
  component: List,
  args: {
    items: MOCK_LIST_ITEMS,
  },
}

export const Basic = (props) => <List {...props} />

export const NestedList = (props) => <List {...props} />
NestedList.args = { items: MOCK_NESTED_LIST_ITEMS }
