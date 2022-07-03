import React from 'react'
import List from './List'
import { MOCK_LIST_ITEMS, MOCK_NESTED_LIST_ITEMS } from '../../mocks'

export default {
  component: List,
  args: {
    items: MOCK_LIST_ITEMS,
  },
}

export const Basic = ({ ...rest }) => <List {...rest} />

export const NestedList = ({ ...rest }) => <List {...rest} />
NestedList.args = { items: MOCK_NESTED_LIST_ITEMS }
