/* eslint-disable unicorn/consistent-function-scoping */

import { printShortDateTime } from '@gravis-os/utils'

const withTimestampFormat = () => (columnDefs) =>
  columnDefs.map((columnDef) =>
    columnDef.field?.endsWith('_at')
      ? {
          valueFormatter: ({ value }) => printShortDateTime(value),
          ...columnDef,
        }
      : columnDef
  )

export default withTimestampFormat
