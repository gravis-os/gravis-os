import React from 'react'
import { Controller, ControllerProps } from 'react-hook-form'
import DateTimeField from './DateTimeField'

export interface ControlledDateFieldProps
  extends Omit<ControllerProps, 'render'> {
  label?: string
  dateTimePickerProps?: React.ComponentProps<typeof DateTimeField>
}

const ControlledDateTimeField: React.FC<ControlledDateFieldProps> = (props) => {
  const { dateTimePickerProps, label, ...rest } = props

  return (
    <Controller
      render={({ field }) => (
        <DateTimeField label={label} {...field} {...dateTimePickerProps} />
      )}
      defaultValue={new Date()}
      {...rest}
    />
  )
}

export default ControlledDateTimeField
