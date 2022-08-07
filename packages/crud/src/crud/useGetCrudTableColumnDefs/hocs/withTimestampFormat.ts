const withTimestampFormat = () => (columnDefs) =>
  columnDefs.map((columnDef) =>
    columnDef.field?.endsWith('_at')
      ? {
          valueFormatter: ({ value }) => new Date(value).toLocaleString(),
          ...columnDef,
        }
      : columnDef
  )

export default withTimestampFormat
