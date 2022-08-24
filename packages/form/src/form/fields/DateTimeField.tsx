import React from 'react'
import { DateTimePicker, DatePickerProps } from '@mui/x-date-pickers'
import { SxProps, TextField, TextFieldProps } from '@mui/material'

interface DateTimeFieldProps extends DatePickerProps<Date> {
  textFieldProps?: Partial<Omit<TextFieldProps, 'variant'>>
  sx: SxProps
}

const DateTimeField: React.FC<DateTimeFieldProps> = (props) => {
  const { textFieldProps, ...rest } = props

  return (
    <DateTimePicker
      renderInput={(props) => (
        <TextField
          sx={{ width: '100%', ...rest?.sx }}
          {...props}
          {...textFieldProps}
        />
      )}
      {...rest}
    />
  )
}

export default DateTimeField
