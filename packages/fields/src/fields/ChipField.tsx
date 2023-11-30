import React from 'react'

import Autocomplete from '@mui/material/Autocomplete'
import isEmpty from 'lodash/isEmpty'

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
      renderInput={(params) => {
        const restParams = {
          ...params,
          ...rest,
          inputProps: {
            ...params.inputProps,
            // validate value only if the chip field has options.
            // if value is not empty, display 1 character string,
            // or, pass empty string as its value.
            ...(!isEmpty(options) && { value: isEmpty(value) ? '' : ' ' }),
          },
        }

        return (
          <TextField
            helperText={<span>Hit Enter &#8592; to Add</span>}
            {...restParams}
          />
        )
      }}
      value={nextValue}
    />
  )
}

export default ChipField
