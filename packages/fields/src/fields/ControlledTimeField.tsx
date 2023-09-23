import React from 'react'
import { Controller, ControllerProps } from 'react-hook-form'

import TimeField from './TimeField'

export interface ControlledTimeFieldProps
  extends Omit<ControllerProps, 'render'> {
  label?: string
  timePickerProps?: React.ComponentProps<typeof TimeField>
}

const ControlledTimeField: React.FC<ControlledTimeFieldProps> = (props) => {
  const { label, timePickerProps, ...rest } = props

  return (
    <Controller
      defaultValue={new Date()}
      render={({ field }) => (
        <TimeField label={label} {...field} {...timePickerProps} />
      )}
      {...rest}
    />
  )
}

export default ControlledTimeField
