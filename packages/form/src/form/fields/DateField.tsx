import React from 'react'
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers'
import { TextField, TextFieldProps } from '@mui/material'

interface DateFieldProps
  extends Omit<DatePickerProps<Date, any>, 'renderInput'> {
  textFieldProps?: Partial<Omit<TextFieldProps, 'variant'>>
  renderInput?: DatePickerProps<Date, any>['renderInput']
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
