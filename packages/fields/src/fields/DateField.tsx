import React from 'react'
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers'
import { TextFieldProps } from '@mui/material'

export interface DateFieldProps
  extends Partial<Omit<TextFieldProps, 'variant' | 'onChange'>> {
  datePickerProps?: Partial<DatePickerProps<Date>>
  onChange: DatePickerProps<Date>['onChange']
}

const DateField: React.FC<DateFieldProps> = (props) => {
  const { datePickerProps, onChange, value, ...rest } = props

  return (
    <DatePicker
      // @ts-ignore
      slotProps={{
        textField: { ...rest },
      }}
      format="dd MMM yyyy"
      onChange={onChange}
      // v6 does not allow value to be string anymore
      value={typeof value === 'string' ? new Date(value) : value}
      {...datePickerProps}
    />
  )
}

export default DateField
