import React from 'react'
import CrudTableComponent from './CrudTable'
import { MOCK_MODULE, MOCK_COLUMN_DEFS } from '../mocks/crud.mocks'

export default {
  title: 'Crud/CrudTable',
  component: CrudTableComponent,
  args: {
    module: MOCK_MODULE,
    columnDefs: MOCK_COLUMN_DEFS,
  },
}

export const CrudTable = args => <CrudTableComponent {...args} />
