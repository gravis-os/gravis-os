import React from 'react'
import { Controller, UseControllerProps } from 'react-hook-form'

import ChipField, { ChipFieldProps } from './ChipField'

export interface ControlledChipFieldProps
  extends UseControllerProps,
    Omit<
      ChipFieldProps,
      'defaultValue' | 'name' | 'onChange' | 'options' | 'value'
    > {}

const ControlledChipField: React.FC<ControlledChipFieldProps> = (props) => {
  const { control, ...rest } = props

  return (
    <Controller
      control={control}
      render={({ field }) => <ChipField {...field} {...rest} />}
      {...rest}
    />
  )
}

export default ControlledChipField
