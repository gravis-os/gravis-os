import React from 'react'
import { Controller, ControllerProps } from 'react-hook-form'
import TimeField from './TimeField'

export interface ControlledTimeFieldProps
  extends Omit<ControllerProps, 'render'> {
  label?: string
  timePickerProps?: React.ComponentProps<typeof TimeField>
}

const ControlledTimeField: React.FC<ControlledTimeFieldProps> = (props) => {
  const { timePickerProps, label, ...rest } = props

  return (
    <Controller
      render={({ field }) => (
        <TimeField views={} label={label} {...field} {...timePickerProps} />
      )}
      defaultValue={new Date()}
      {...rest}
    />
  )
}

export default ControlledTimeField
