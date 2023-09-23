import React from 'react'
import { Controller, UseControllerProps } from 'react-hook-form'

import { Autocomplete, AutocompleteProps } from '@mui/material'
import startCase from 'lodash/startCase'

import TextField, { TextFieldProps } from './TextField'

export interface ControlledAutocompleteFieldProps
  extends Omit<UseControllerProps, 'defaultValue'>,
    Omit<
      AutocompleteProps<unknown, any, any, any>,
      'onChange' | 'renderInput' | 'value'
    > {
  required?
  textFieldProps?: TextFieldProps
}

const ControlledAutocompleteField: React.FC<
  ControlledAutocompleteFieldProps
> = (props) => {
  const { control, options, required, textFieldProps, ...rest } = props
  const { name } = rest

  // @link https://codesandbox.io/s/react-hook-form-v7-material-ui-5-lazy-loaded-values-not-validated-in-autocomplete-forked-h7ugr?file=/src/App.js
  return (
    <Controller
      control={control}
      render={({ field }) => (
        <Autocomplete
          options={options}
          {...field}
          onChange={(e, data) => field.onChange(data)}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                inputProps={
                  {
                    ...params?.inputProps,
                    ...(required && { required: true }),
                  } as TextFieldProps['inputProps']
                }
                label={`Select ${startCase(
                  name.endsWith('_id') ? name.split('_id')[0] : name
                )}`}
                {...(required && { required: true })}
                {...textFieldProps}
              />
            )
          }}
        />
      )}
      {...rest}
    />
  )
}

export default ControlledAutocompleteField
