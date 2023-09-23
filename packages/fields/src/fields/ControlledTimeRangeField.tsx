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
  const { label, timePickerProps, ...rest } = props

  return (
    <Controller
      defaultValue={new Date()}
      render={({ field }) => (
        <TimeRangeField label={label} {...field} {...timePickerProps} />
      )}
      {...rest}
    />
  )
}

export default ControlledTimeRangeField
