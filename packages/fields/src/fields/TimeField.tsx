import React from 'react'

import { SxProps, TextFieldProps } from '@mui/material'
import { TimePicker, TimePickerProps } from '@mui/x-date-pickers'

export interface TimeFieldProps extends TimePickerProps<Date> {
  sx?: SxProps
  textFieldProps?: Partial<Omit<TextFieldProps, 'variant'>>
}

const TimeField: React.FC<TimeFieldProps> = (props) => {
  const { textFieldProps, value, ...rest } = props

  return (
    <TimePicker
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

export default TimeField
