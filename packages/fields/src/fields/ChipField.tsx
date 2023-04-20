import { Autocomplete } from '@mui/material'
import { isEmpty, isNil } from 'lodash'
import React from 'react'
import TextField, { TextFieldProps } from './TextField'

export interface ChipFieldProps extends TextFieldProps {
  options?: string[]
  value?: any
  onChange?: (data) => void
  disableCloseOnSelect?: boolean
}

const ChipField: React.FC<ChipFieldProps> = (props) => {
  const {
    options,
    onChange,
    value,
    disableCloseOnSelect,
    defaultValue,
    ...rest
  } = props

  const nextValue = value || []
  const hasValue = !isNil(value)
  const hasDefaultValue = !isEmpty(defaultValue)
  const displayValue = hasValue || !hasDefaultValue ? nextValue : defaultValue

  return (
    <Autocomplete
      freeSolo
      multiple
      options={options || []}
      renderInput={(params) => (
        <TextField
          helperText={<span>Hit Enter &#8592; to Add</span>}
          {...params}
          {...rest}
        />
      )}
      onChange={(e, data) => onChange?.(data)}
      value={displayValue}
      disableCloseOnSelect={disableCloseOnSelect}
    />
  )
}

export default ChipField
