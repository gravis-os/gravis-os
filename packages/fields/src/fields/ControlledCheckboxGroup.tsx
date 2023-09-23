import React from 'react'
import { Controller, ControllerProps } from 'react-hook-form'

import CheckboxGroup, { CheckboxGroupProps } from './CheckboxGroup'

export interface ControlledCheckboxGroupProps
  extends Omit<CheckboxGroupProps, 'formState'> {
  control: ControllerProps['control']
  controllerProps?: Partial<ControllerProps>
  name: string
}

const ControlledCheckboxGroup: React.FC<ControlledCheckboxGroupProps> = (
  props
) => {
  const { controllerProps, name, ...rest } = props
  const { required } = rest
  return (
    <Controller
      name={name}
      render={({ field, formState }) => {
        return <CheckboxGroup {...field} formState={formState} {...rest} />
      }}
      {...(typeof required === 'boolean' && { rules: { required } })}
      {...controllerProps}
    />
  )
}

export default ControlledCheckboxGroup
