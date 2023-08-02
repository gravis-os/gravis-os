import React from 'react'
import {
  SingleInputTimeRangeField,
  UseSingleInputTimeRangeFieldProps,
} from '@mui/x-date-pickers-pro'
import { SxProps, TextFieldProps } from '@mui/material'

export interface TimeRangeFieldProps
  extends UseSingleInputTimeRangeFieldProps<Date> {
  label?: string
  textFieldProps?: Partial<Omit<TextFieldProps, 'variant'>>
  sx?: SxProps
}

const TimeRangeField: React.FC<TimeRangeFieldProps> = (props) => {
  const { textFieldProps, value, ...rest } = props

  return (
    <SingleInputTimeRangeField
      // @ts-ignore
      slotProps={{
        textField: {
          sx: { width: '100%', ...rest?.sx },
          ...textFieldProps,
        },
      }}
      // v6 does not allow value to be string anymore
      value={value}
      {...rest}
    />
  )
}

export default TimeRangeField
