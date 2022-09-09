const enhanceFunction = (fn: CallableFunction, injectedArguments) =>
  typeof fn === 'function'
    ? (initialArguments) => fn({ ...initialArguments, ...injectedArguments })
    : fn

const withCheckboxSelection =
  ({ crudContext }) =>
  (columnDefs) => {
    return columnDefs.map((columnDef) => {
      const { hasCheckboxSelection } = columnDef
      return hasCheckboxSelection
        ? {
            ...columnDef,
            checkboxSelection: true,
            headerCheckboxSelection: true,
            showDisabledCheckboxes: true,
          }
        : {
            ...columnDef,
            checkboxSelection: enhanceFunction(columnDef.checkboxSelection, {
              crudContext,
            }),
            headerCheckboxSelection: enhanceFunction(
              columnDef.headerCheckboxSelection,
              {
                crudContext,
              }
            ),
          }
    })
  }

export default withCheckboxSelection
