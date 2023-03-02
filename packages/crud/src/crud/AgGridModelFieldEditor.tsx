import React, { forwardRef } from 'react'
import { ModelField } from '@gravis-os/form'
import { useController } from 'react-hook-form'
import { GridOptions } from 'ag-grid-community'

const AgGridModelFieldEditor = forwardRef((props: any, ref) => {
  const {
    api,
    module,
    column,
    rowIndex,
    options,
    value: injectedValue,
    setValue,
    fieldArray,
    filters,
    control,
    ...rest
  } = props
  const { field } = column.userProvidedColDef
  const name = `lines.${rowIndex}.${field}`

  const {
    field: { onChange, onBlur, value },
  } = useController({
    name,
    control,
    defaultValue: injectedValue,
  })

  const gridOptions = api.gridOptionsWrapper.gridOptions as GridOptions
  const disabled = gridOptions?.suppressClickEdit

  return (
    <ModelField
      disabled={disabled}
      ref={ref}
      module={module}
      value={value}
      setValue={setValue}
      onChange={onChange}
      onBlur={onBlur}
      name={name}
      select={module.select.list}
      filters={filters}
      disableClearable
      fullWidth
      {...rest}
    />
  )
})

export default AgGridModelFieldEditor
