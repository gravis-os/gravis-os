import React, { type FC } from 'react'
import {
  MultiInputTimeRangeField,
  UseMultiInputTimeRangeFieldProps,
} from '@mui/x-date-pickers-pro/MultiInputTimeRangeField'
import type { SxProps } from '@mui/material'
import { TextFieldProps } from '@mui/material'

export interface MultiTimeRangeFieldProps
  extends UseMultiInputTimeRangeFieldProps<Date> {
  label?: string
  textFieldProps?: Partial<Omit<TextFieldProps, 'variant'>>
  sx?: SxProps
}

const MultiTimeRangeField: FC<MultiTimeRangeFieldProps> = (props) => {
  const { textFieldProps, ...rest } = props

  return (
    <MultiInputTimeRangeField
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

export default MultiTimeRangeField
