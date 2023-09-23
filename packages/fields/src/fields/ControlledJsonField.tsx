import React from 'react'
import { Control, Controller } from 'react-hook-form'

import JsonField, { JsonFieldProps } from './JsonField'

export interface ControlledJsonFieldProps
  extends Omit<JsonFieldProps, 'value'> {
  control: Control
}

const ControlledJsonField: React.FC<ControlledJsonFieldProps> = (props) => {
  const { control, ...rest } = props
  return (
    <Controller
      control={control}
      render={({ field }) => {
        return (
          <JsonField {...(field as any)} value={field.value ?? ''} {...rest} />
        )
      }}
      {...rest}
    />
  )
}

export default ControlledJsonField
