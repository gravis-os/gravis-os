import React from 'react'
import { Control, Controller } from 'react-hook-form'
import JSONField, { JSONFieldProps } from './JSONField'

export interface ControlledJSONFieldProps
  extends Omit<JSONFieldProps, 'value'> {
  control: Control
}

const ControlledJSONField: React.FC<ControlledJSONFieldProps> = (props) => {
  const { control, ...rest } = props

  return (
    <Controller
      control={control}
      render={({ field }) => {
        return (
          <JSONField {...(field as any)} value={field.value ?? ''} {...rest} />
        )
      }}
      {...rest}
    />
  )
}

export default ControlledJSONField
