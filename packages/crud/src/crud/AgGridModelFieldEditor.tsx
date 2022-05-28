import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { ModelField } from '@gravis-os/form'

const AgGridModelFieldEditor = forwardRef((props: any, ref) => {
  const {
    module,
    column,
    rowIndex,
    options,
    value,
    setValue,
    fieldArray,
    ...rest
  } = props
  const { update } = fieldArray
  const { field } = column.userProvidedColDef
  const name = `lines[${rowIndex}].${field}`

  console.log('jjj: AgGridModelFieldEditor', {
    name,
    props,
  })

  const handleChange = (value) => {
    if (!value) return null
    console.log('jjj: handleChange', { name, value })
    // This really sets the AgGrid values
    update(name, value.id)
  }

  useImperativeHandle(ref, () => {
    return {
      getValue: () => {
        return value
      },
      afterGuiAttached: () => {
        setValue(value)
      },
    }
  })

  return (
    <ModelField
      module={module}
      name={name}
      value={value}
      setValue={setValue}
      onChange={handleChange}
      select={module.select.list}
      disableClearable
      fullWidth
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
