import React from 'react'

import { MOCK_COLUMN_DEFS, MOCK_MODULE } from '../mocks/crud.mocks'
import getStorybookTitle from '../utils/getStorybookTitle'
import CrudTableComponent from './CrudTable'

export default {
  title: getStorybookTitle(CrudTableComponent.name),
  args: {
    columnDefs: MOCK_COLUMN_DEFS,
    module: MOCK_MODULE,
  },
  component: CrudTableComponent,
}

export const Basic = (args) => <CrudTableComponent {...args} />
