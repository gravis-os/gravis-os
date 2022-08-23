import React from 'react'
import { DateTimePicker, DatePickerProps } from '@mui/x-date-pickers'
import { TextField, TextFieldProps } from '@mui/material'

interface DateTimeFieldProps extends DatePickerProps<Date> {
  textFieldProps?: Partial<Omit<TextFieldProps, 'variant'>>
}

const DateTimeField: React.FC<DateTimeFieldProps> = (props) => {
  const { textFieldProps, ...rest } = props

  return (
    <DateTimePicker
      renderInput={(props) => <TextField {...props} {...textFieldProps} />}
      inputFormat="dd MMM yyyy"
      {...rest}
    />
  )
}

export default DateTimeField
