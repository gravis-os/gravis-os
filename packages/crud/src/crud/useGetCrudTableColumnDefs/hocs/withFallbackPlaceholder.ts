const withFallbackPlaceholder =
  ({ disableFallbackPlaceholder, fallbackPlaceholder }) =>
  (columnDefs) => {
    return disableFallbackPlaceholder
      ? columnDefs
      : columnDefs.map((columnDef) => ({
          valueFormatter: ({ value }) => value || fallbackPlaceholder,
          ...columnDef,
        }))
  }

export default withFallbackPlaceholder
