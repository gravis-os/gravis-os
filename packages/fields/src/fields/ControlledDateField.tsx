import React from 'react'
import { Controller, ControllerProps } from 'react-hook-form'
import DateField, { DateFieldProps } from './DateField'

export interface ControlledDateFieldProps extends Partial<DateFieldProps> {
  name: string
  control: ControllerProps['control']
  controllerProps?: Partial<ControllerProps>
}

const ControlledDateField: React.FC<ControlledDateFieldProps> = (props) => {
  const { name, controllerProps, ...rest } = props
  return (
    <Controller
      name={name}
      render={({ field }) => <DateField {...field} {...rest} />}
      defaultValue={new Date()}
      {...controllerProps}
    />
  )
}

export default ControlledDateField
