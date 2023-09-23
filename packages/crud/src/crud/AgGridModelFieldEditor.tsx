import React, { forwardRef } from 'react'
import { useController } from 'react-hook-form'

import { ModelField } from '@gravis-os/form'
import { GridOptions } from 'ag-grid-community'

const AgGridModelFieldEditor = forwardRef((props: any, ref) => {
  const {
    api,
    column,
    control,
    fieldArray,
    filters,
    module,
    name: injectedName = 'lines',
    options,
    rowIndex,
    setValue,
    value: injectedValue,
    ...rest
  } = props
  const { field } = column.userProvidedColDef
  const name = `${injectedName}.${rowIndex}.${field}`

  const {
    field: { onBlur, onChange, value },
  } = useController({
    control,
    defaultValue: injectedValue,
    name,
  })

  const gridOptions = api.gridOptionsWrapper.gridOptions as GridOptions
  const disabled = gridOptions?.suppressClickEdit

  return (
    <ModelField
      disableClearable
      disabled={disabled}
      filters={filters}
      fullWidth
      module={module}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      ref={ref}
      select={module.select.list}
      setValue={setValue}
      value={value}
      {...rest}
    />
  )
})

export default AgGridModelFieldEditor
