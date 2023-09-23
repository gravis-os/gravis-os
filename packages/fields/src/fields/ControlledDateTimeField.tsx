import React from 'react'
import { Controller, ControllerProps } from 'react-hook-form'

import DateTimeField from './DateTimeField'

export interface ControlledDateTimeFieldProps
  extends Omit<ControllerProps, 'render'> {
  dateTimePickerProps?: React.ComponentProps<typeof DateTimeField>
  label?: string
}

const ControlledDateTimeField: React.FC<ControlledDateTimeFieldProps> = (
  props
) => {
  const { dateTimePickerProps, label, ...rest } = props

  return (
    <Controller
      defaultValue={new Date()}
      render={({ field }) => (
        <DateTimeField label={label} {...field} {...dateTimePickerProps} />
      )}
      {...rest}
    />
  )
}

export default ControlledDateTimeField
