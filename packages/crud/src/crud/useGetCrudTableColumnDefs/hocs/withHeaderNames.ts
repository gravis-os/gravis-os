/* eslint-disable unicorn/consistent-function-scoping */

import startCase from 'lodash/startCase'

const withHeaderNames = () => (columnDefs) =>
  columnDefs.map((columnDef) => ({
    headerName: columnDef.field && startCase(columnDef.field),
    ...columnDef,
  }))

export default withHeaderNames
