import React from 'react'
import { Controller, ControllerProps } from 'react-hook-form'
import DateField from './DateField'

export interface ControlledDateFieldProps
  extends Omit<ControllerProps, 'render'> {
  label?: string
  datePickerProps?: React.ComponentProps<typeof DateField>
}

const ControlledDateField: React.FC<ControlledDateFieldProps> = (props) => {
  const { datePickerProps, label, ...rest } = props
  return (
    <Controller
      render={({ field }) => (
        <DateField label={label} {...field} {...datePickerProps} />
      )}
      defaultValue={new Date()}
      {...rest}
    />
  )
}

export default ControlledDateField
