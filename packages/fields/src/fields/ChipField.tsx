import React from 'react'

import { Autocomplete } from '@mui/material'

import TextField, { TextFieldProps } from './TextField'

export interface ChipFieldProps extends TextFieldProps {
  disableCloseOnSelect?: boolean
  onChange?: (data) => void
  options?: string[]
  value?: any
}

const ChipField: React.FC<ChipFieldProps> = (props) => {
  const { disableCloseOnSelect, onChange, options, value, ...rest } = props

  const nextValue = value || []

  return (
    <Autocomplete
      disableCloseOnSelect={disableCloseOnSelect}
      freeSolo
      multiple
      onChange={(e, data) => onChange?.(data)}
      options={options || []}
      renderInput={(params) => (
        <TextField
          helperText={<span>Hit Enter &#8592; to Add</span>}
          {...params}
          {...rest}
        />
      )}
      value={nextValue}
    />
  )
}

export default ChipField
