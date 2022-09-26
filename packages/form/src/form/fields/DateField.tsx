import React from 'react'
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers'
import { TextField, TextFieldProps } from '@mui/material'

export interface DateFieldProps
  extends Omit<DatePickerProps<unknown, Date>, 'renderInput'> {
  textFieldProps?: Partial<Omit<TextFieldProps, 'variant'>>
  renderInput?: DatePickerProps<unknown, Date>['renderInput']
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
