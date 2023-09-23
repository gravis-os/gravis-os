import React from 'react'

import {
  MOCK_COLUMN_DEFS,
  MOCK_FORM_SECTIONS,
  MOCK_MODULE,
} from '../mocks/crud.mocks'
import getStorybookTitle from '../utils/getStorybookTitle'
import ListPageComponent from './ListPage'

export default {
  title: getStorybookTitle(ListPageComponent.name),
  args: {
    columnDefs: MOCK_COLUMN_DEFS,
    filterFormSections: MOCK_FORM_SECTIONS,
    module: MOCK_MODULE,
  },
  component: ListPageComponent,
}

export const Basic = (args) => <ListPageComponent {...args} />
