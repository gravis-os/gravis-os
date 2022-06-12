import React from 'react'
import { Controller, UseControllerProps } from 'react-hook-form'
import ModelField, { ModelFieldProps } from './ModelField'

export interface ControlledModelFieldProps
  extends UseControllerProps,
    Omit<ModelFieldProps, 'onChange' | 'value'> {}

const ControlledModelField: React.FC<ControlledModelFieldProps> = (props) => {
  const { control, setValue, module, ...rest } = props

  return (
    <Controller
      control={control}
      render={({ field }) => (
        <ModelField {...field} module={module} setValue={setValue} {...rest} />
      )}
      {...rest}
    />
  )
}

export default ControlledModelField
