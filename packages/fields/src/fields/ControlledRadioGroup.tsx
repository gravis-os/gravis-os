import React from 'react'
import { Controller, ControllerProps } from 'react-hook-form'
import RadioGroup, { RadioGroupProps } from './RadioGroup'

export interface ControlledRadioGroupProps extends RadioGroupProps {
  name: string
  control: ControllerProps['control']
  controllerProps?: Partial<ControllerProps>
}

const ControlledRadioGroup: React.FC<ControlledRadioGroupProps> = (props) => {
  const { name, controllerProps, control, ...rest } = props
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => <RadioGroup {...field} {...rest} />}
      {...controllerProps}
    />
  )
}

export default ControlledRadioGroup
