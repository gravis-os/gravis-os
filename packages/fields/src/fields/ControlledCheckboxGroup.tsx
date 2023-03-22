import React from 'react'
import { Controller, ControllerProps } from 'react-hook-form'
import CheckboxGroup, { CheckboxGroupProps } from './CheckboxGroup'

export interface ControlledCheckboxGroupProps
  extends Omit<CheckboxGroupProps, 'formState'> {
  name: string
  control: ControllerProps['control']
  controllerProps?: Partial<ControllerProps>
}

const ControlledCheckboxGroup: React.FC<ControlledCheckboxGroupProps> = (
  props
) => {
  const { name, controllerProps, ...rest } = props
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
