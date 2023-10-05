import type { SxProps } from '@mui/material'

import React, { type FC } from 'react'

import { TextFieldProps } from '@mui/material'
import {
  MultiInputTimeRangeField,
  UseMultiInputTimeRangeFieldProps,
} from '@mui/x-date-pickers-pro/MultiInputTimeRangeField'

export interface MultiTimeRangeFieldProps
  extends UseMultiInputTimeRangeFieldProps<Date> {
  label?: string
  sx?: SxProps
  textFieldProps?: Partial<Omit<TextFieldProps, 'variant'>>
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
