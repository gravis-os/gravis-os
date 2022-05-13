import React from 'react'
import ListPageComponent from './ListPage'
import {
  MOCK_MODULE,
  MOCK_COLUMN_DEFS,
  MOCK_FORM_SECTIONS,
} from '../mocks/crud.mocks'

export default {
  title: 'Crud/ListPage',
  component: ListPageComponent,
  args: {
    module: MOCK_MODULE,
    columnDefs: MOCK_COLUMN_DEFS,
    filterFormSections: MOCK_FORM_SECTIONS,
  },
}

export const ListPage = args => <ListPageComponent {...args} />
