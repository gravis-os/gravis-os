const withCheckboxSelection = () => (columnDefs) => {
  return columnDefs.map((columnDef) => {
    const { hasCheckboxSelection } = columnDef
    return hasCheckboxSelection
      ? {
          ...columnDef,
          checkboxSelection: true,
          headerCheckboxSelection: true,
          showDisabledCheckboxes: true,
        }
      : columnDef
  })
}

export default withCheckboxSelection
