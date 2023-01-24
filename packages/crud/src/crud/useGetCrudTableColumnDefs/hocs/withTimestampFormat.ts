import { printDateTime } from '@gravis-os/utils'

const withTimestampFormat = () => (columnDefs) =>
  columnDefs.map((columnDef) =>
    columnDef.field?.endsWith('_at')
      ? {
          valueFormatter: ({ value }) => printDateTime(value),
          ...columnDef,
        }
      : columnDef
  )

export default withTimestampFormat
