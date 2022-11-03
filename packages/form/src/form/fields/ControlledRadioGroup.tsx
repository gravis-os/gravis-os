import React from 'react'
import { Controller, ControllerProps } from 'react-hook-form'
import { RadioGroup, RadioGroupProps } from '@gravis-os/ui'

export interface ControlledRadioGroupProps extends RadioGroupProps {
  name: string
  control: ControllerProps['control']
  controllerProps?: Partial<ControllerProps>
}

const ControlledRadioGroup: React.FC<ControlledRadioGroupProps> = (props) => {
  const { name, controllerProps, ...rest } = props
  return (
    <Controller
      name={name}
      render={({ field }) => <RadioGroup {...field} {...rest} />}
      defaultValue={new Date()}
      {...controllerProps}
    />
  )
}

export default ControlledRadioGroup
