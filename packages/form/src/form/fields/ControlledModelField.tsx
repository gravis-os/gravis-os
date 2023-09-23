import React from 'react'
import { Controller, UseControllerProps } from 'react-hook-form'

import withInterceptedHandlerProps from '../utils/withInterceptedHandlerProps'
import ModelField, { ModelFieldProps } from './ModelField'

export interface ControlledModelFieldProps
  extends UseControllerProps,
    Omit<ModelFieldProps, 'onChange' | 'value'> {}

const ControlledModelField: React.FC<ControlledModelFieldProps> = (props) => {
  const { control, module, setValue, ...rest } = props

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
