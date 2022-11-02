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
  component: ListPageComponent,
  args: {
    module: MOCK_MODULE,
    columnDefs: MOCK_COLUMN_DEFS,
    filterFormSections: MOCK_FORM_SECTIONS,
  },
}

export const Basic = (args) => <ListPageComponent {...args} />
