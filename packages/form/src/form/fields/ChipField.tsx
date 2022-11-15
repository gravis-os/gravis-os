import React from 'react'
import { Autocomplete } from '@mui/material'
import TextField, { TextFieldProps } from './TextField'

export interface ChipFieldProps extends TextFieldProps {
  options?: string[]
  value?: any
  onChange?: (data) => void
  disableCloseOnSelect?: boolean
}

const ChipField: React.FC<ChipFieldProps> = (props) => {
  const { options, onChange, value, disableCloseOnSelect, ...rest } = props

  const nextValue = value || []

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
      value={nextValue}
      disableCloseOnSelect={disableCloseOnSelect}
    />
  )
}

export default ChipField
