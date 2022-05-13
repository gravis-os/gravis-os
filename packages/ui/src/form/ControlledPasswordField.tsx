import React, { useState } from 'react'
import { Controller, ControllerProps } from 'react-hook-form'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { InputAdornment } from '@mui/material'
import TextField from './TextField'
import IconButton from '../ui/IconButton'

type ControlledPasswordFieldProps = ControllerProps<any, any> & {
  name: string
}

const ControlledPasswordField: React.FC<
  ControlledPasswordFieldProps
> = props => {
  const { name, control, ...rest } = props
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  size="large"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...rest}
        />
      )}
      {...rest}
    />
  )
}

export default ControlledPasswordField
