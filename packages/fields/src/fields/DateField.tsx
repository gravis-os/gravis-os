import React from 'react'

import { TextFieldProps } from '@mui/material'
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers'

export interface DateFieldProps
  extends Partial<Omit<TextFieldProps, 'onChange' | 'variant'>> {
  datePickerProps?: Partial<DatePickerProps<Date>>
  onChange: DatePickerProps<Date>['onChange']
}

const DateField: React.FC<DateFieldProps> = (props) => {
  const { datePickerProps, onChange, value, ...rest } = props

  return (
    <DatePicker
      format="dd MMM yyyy"
      onChange={onChange}
      // @ts-ignore
      slotProps={{
        textField: { ...rest },
      }}
      // v6 does not allow value to be string anymore
      value={typeof value === 'string' ? new Date(value) : value}
      {...datePickerProps}
    />
  )
}

export default DateField
