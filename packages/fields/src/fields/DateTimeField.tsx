import React from 'react'

import { SxProps, TextFieldProps } from '@mui/material'
import { DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers'

export interface DateTimeFieldProps extends DateTimePickerProps<Date> {
  sx: SxProps
  textFieldProps?: Partial<Omit<TextFieldProps, 'variant'>>
}

const DateTimeField: React.FC<DateTimeFieldProps> = (props) => {
  const { textFieldProps, value, ...rest } = props

  return (
    <DateTimePicker
      // @ts-ignore
      slotProps={{
        textField: {
          sx: { width: '100%', ...rest?.sx },
          ...textFieldProps,
        },
      }}
      // v6 does not allow value to be string anymore
      value={typeof value === 'string' ? new Date(value) : value}
      {...rest}
    />
  )
}

export default DateTimeField
