import React from 'react'
import { DatePicker, DatePickerProps } from '@mui/lab'
import { TextField, TextFieldProps } from '@mui/material'

interface DateFieldProps extends DatePickerProps<Date> {
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
