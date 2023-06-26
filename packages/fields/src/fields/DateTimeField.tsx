import React from 'react'
import { DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers'
import { SxProps, TextFieldProps } from '@mui/material'

export interface DateTimeFieldProps extends DateTimePickerProps<Date> {
  textFieldProps?: Partial<Omit<TextFieldProps, 'variant'>>
  sx: SxProps
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
