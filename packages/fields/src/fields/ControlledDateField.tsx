import React from 'react'
import { Controller, ControllerProps } from 'react-hook-form'

import DateField, { DateFieldProps } from './DateField'

export interface ControlledDateFieldProps extends Partial<DateFieldProps> {
  control: ControllerProps['control']
  controllerProps?: Partial<ControllerProps>
  name: string
}

const ControlledDateField: React.FC<ControlledDateFieldProps> = (props) => {
  const { controllerProps, name, ...rest } = props
  return (
    <Controller
      defaultValue={new Date()}
      name={name}
      render={({ field }) => <DateField {...field} {...rest} />}
      {...controllerProps}
    />
  )
}

export default ControlledDateField
