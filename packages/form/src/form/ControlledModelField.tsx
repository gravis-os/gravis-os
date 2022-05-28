import React from 'react'
import { Control, Controller } from 'react-hook-form'
import { CrudModule } from '../types'
import ModelField, { ModelFieldProps } from './ModelField'

export interface ControlledSwitchFieldProps {
  control: Control
  name: string
  module: CrudModule
  setValue: ModelFieldProps['setValue']
}

const ControlledSwitchField: React.FC<ControlledSwitchFieldProps> = (props) => {
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

export default ControlledSwitchField
