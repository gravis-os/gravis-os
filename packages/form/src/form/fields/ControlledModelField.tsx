import React from 'react'
import { Controller, UseControllerProps } from 'react-hook-form'
import ModelField, { ModelFieldProps } from './ModelField'
import withInterceptedHandlerProps from '../utils/withInterceptedHandlerProps'

export interface ControlledModelFieldProps
  extends UseControllerProps,
    Omit<ModelFieldProps, 'onChange' | 'value'> {}

const ControlledModelField: React.FC<ControlledModelFieldProps> = (props) => {
  const { control, setValue, module, ...rest } = props

  return (
    <Controller
      control={control}
      render={({ field }) => (
        <ModelField
          module={module}
          setValue={setValue}
          // Intercept handlers for downstream usage so it doesn't override the handlers from Controller's render prop params
          {...withInterceptedHandlerProps(field)({ ...rest })}
        />
      )}
      {...rest}
    />
  )
}

export default ControlledModelField
