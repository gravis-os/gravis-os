import React from 'react'
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers'
import { TextField, TextFieldProps } from '@mui/material'

export interface DateFieldProps
  extends Partial<Omit<TextFieldProps, 'variant' | 'onChange'>> {
  datePickerProps?: Partial<DatePickerProps<Date>>
  onChange: DatePickerProps<Date>['onChange']
}

const DateField: React.FC<DateFieldProps> = (props) => {
  const { datePickerProps, onChange, value, ...rest } = props

  return (
    <DatePicker
      renderInput={(props) => <TextField {...props} {...rest} />}
      inputFormat="dd MMM yyyy"
      onChange={onChange}
      value={value}
      {...datePickerProps}
    />
  )
}

export default DateField
