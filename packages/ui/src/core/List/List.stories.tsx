import React from 'react'
import List from './List'
import { MOCK_LIST_ITEMS, MOCK_NESTED_LIST_ITEMS } from '../../mocks'

export default {
  component: List,
  args: {
    items: MOCK_LIST_ITEMS,
  },
}

export const Basic = (props) => <List {...props} />

export const NestedList = (props) => <List {...props} />
NestedList.args = { items: MOCK_NESTED_LIST_ITEMS }
