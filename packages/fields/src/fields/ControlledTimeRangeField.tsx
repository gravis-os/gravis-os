import React from 'react'
import { Controller, ControllerProps } from 'react-hook-form'
import TimeRangeField from './TimeRangeField'

export interface ControlledTimeRangeFieldProps
  extends Omit<ControllerProps, 'render'> {
  label?: string
  timePickerProps?: React.ComponentProps<typeof TimeRangeField>
}

const ControlledTimeRangeField: React.FC<ControlledTimeRangeFieldProps> = (
  props
) => {
  const { timePickerProps, label, ...rest } = props

  return (
    <Controller
      render={({ field }) => (
        <TimeRangeField label={label} {...field} {...timePickerProps} />
      )}
      defaultValue={new Date()}
      {...rest}
    />
  )
}

export default ControlledTimeRangeField
