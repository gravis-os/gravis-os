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

  // return (
  //   <Autocomplete
  //     style={{ padding: '0 10px' }}
  //     options={options}
  //     value={value}
  //     onChange={handleChange}
  //     inputValue={inputValue}
  //     onInputChange={handleInputChange}
  //     disableClearable
  //     renderInput={(params) => (
  //       <TextField
  //         {...params}
  //         style={{ padding: '5px 0' }}
  //         placeholder={`Select ${props.column.colId}`}
  //       />
  //     )}
  //   />
  // )
})

export default AgGridModelFieldEditor
