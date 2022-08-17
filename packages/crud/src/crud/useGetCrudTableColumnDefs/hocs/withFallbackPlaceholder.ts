const withFallbackPlaceholder =
  ({ fallbackPlaceholder, disableFallbackPlaceholder }) =>
  (columnDefs) => {
    return disableFallbackPlaceholder
      ? columnDefs
      : columnDefs.map((columnDef) => ({
          valueFormatter: ({ value }) => value || fallbackPlaceholder,
          ...columnDef,
        }))
  }

export default withFallbackPlaceholder
