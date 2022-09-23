import React from 'react'
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers'
import { TextField, TextFieldProps } from '@mui/material'

interface DateFieldProps extends DatePickerProps<Date, any> {
  textFieldProps?: Partial<Omit<TextFieldProps, 'variant'>>
}

const DateField: React.FC<DateFieldProps> = (props) => {
  const { textFieldProps, ...rest } = props

  return (
    <DatePicker
      renderInput={(props) => <TextField {...props} {...textFieldProps} />}
      inputFormat="dd MMM yyyy"
      {...rest}
    />
  )
}

export default DateField
