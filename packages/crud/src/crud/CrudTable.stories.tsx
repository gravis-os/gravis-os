import React from 'react'
import { MOCK_COLUMN_DEFS, MOCK_MODULE } from '../mocks/crud.mocks'
import getStorybookTitle from '../utils/getStorybookTitle'
import CrudTableComponent from './CrudTable'

export default {
  title: getStorybookTitle(CrudTableComponent.name),
  component: CrudTableComponent,
  args: {
    module: MOCK_MODULE,
    columnDefs: MOCK_COLUMN_DEFS,
  },
}

export const Basic = (args) => <CrudTableComponent {...args} />
