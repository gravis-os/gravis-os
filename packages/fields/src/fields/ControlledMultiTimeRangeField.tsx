import React from 'react'
import { Controller, ControllerProps } from 'react-hook-form'
import MultiTimeRangeField from './MultiTimeRangeField'

export interface ControlledMultiTimeRangeFieldProps
  extends Omit<ControllerProps, 'render'> {
  label?: string
  timePickerProps?: React.ComponentProps<typeof MultiTimeRangeField>
}

const ControlledMultiTimeRangeField: React.FC<
  ControlledMultiTimeRangeFieldProps
> = (props) => {
  const { timePickerProps, label, ...rest } = props

  return (
    <Controller
      render={({ field }) => (
        <MultiTimeRangeField label={label} {...field} {...timePickerProps} />
      )}
      {...rest}
    />
  )
}

export default ControlledMultiTimeRangeField
