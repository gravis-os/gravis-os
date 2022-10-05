import React, { forwardRef } from 'react'
import { ModelField } from '@gravis-os/form'
import { useController } from 'react-hook-form'

const AgGridModelFieldEditor = forwardRef((props: any, ref) => {
  const {
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
  const name = `lines[${rowIndex}].${field}`

  const {
    field: { onChange, onBlur, value },
  } = useController({
    name,
    control,
    defaultValue: injectedValue,
  })

  return (
    <ModelField
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
