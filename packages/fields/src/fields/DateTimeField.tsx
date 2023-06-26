import React from 'react'
import { DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers'
import { SxProps, TextFieldProps } from '@mui/material'

export interface DateTimeFieldProps extends DateTimePickerProps<Date> {
  textFieldProps?: Partial<Omit<TextFieldProps, 'variant'>>
  sx: SxProps
}

const DateTimeField: React.FC<DateTimeFieldProps> = (props) => {
  const { textFieldProps, ...rest } = props

  return (
    <DateTimePicker
      // @ts-ignore
      slotProps={{
        textField: {
          sx: { width: '100%', ...rest?.sx },
          ...textFieldProps,
        },
      }}
      {...rest}
    />
  )
}

export default DateTimeField
